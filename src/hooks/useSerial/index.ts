import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import {
  AT_GET_JSON,
  HEALTH_CHECK,
  AT_GET_JSON_PACKAGE_COUNT_COMMAND,
  AT_GET_IMEI,
  AT_GET_MODEL_INFO,
  EXCLUDE_STRING,
  CR,
} from "./constant";
import useSerialStore from "../../stores/useSerialStore";
import { fileDownload } from "@/utils/fileDownload";
import { getGeofenceData } from "./utils";
import { addReadLog, addWriteLog } from "@/utils/idbLogUtil";

const options = {
  baudRate: 115200,
};

const SUFFIX = "\n";

export const delayPromise = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const isEndOfMessage = (value: string) => value.includes(CR);

const updateIndexedDB = async (
  imei: string,
  value: string,
  ref: any,
  broadcastChannel: BroadcastChannel
) => {
  if (isEndOfMessage(value)) {
    await addReadLog(imei, (ref.current.get(imei) || "") + value);
    broadcastChannel.postMessage({ status: "updated", imei });
    ref.current.set(imei, undefined);
  } else {
    ref.current.set(imei, (ref.current.get(imei) || "") + value);
  }
};

const DELAY_MS = 100;

const useSerial = () => {
  const modelVersionBufferRef = useRef(new Map());
  const imeiBufferRef = useRef(new Map());
  const totalGrpNoBufferRef = useRef(new Map());
  const jsonPacketBufferRef = useRef(new Map());
  const jsonPacketBufferCountRef = useRef(new Map());
  const callbackRef = useRef(new Map());
  const csvBufferRef = useRef(new Map());
  const indexeddbRef = useRef(new Map());
  const [connectingPortCount, setConnectingPortCount] = useState(0);
  const broadcastChannel = new BroadcastChannel("command_log");
  const {
    portList,
    addSerialPort,
    deleteSerialPort,
    editSerialPort,
    setJsonPackageOfSerialPort,
    setPackageFetchingStart,
    setCircularGeofence,
    setPolygonGeofence,
  } = useSerialStore();

  const killAllPort = () => {
    portList.forEach((port) => {
      close({ ...port });
    });
  };

  const forgetAllPort = () => {
    portList.forEach((port) => {
      forget(port.port);
    });
  };

  const getPorts = async () => {
    try {
      const allowedPortList = await navigator.serial.getPorts();

      allowedPortList.forEach(async (port) => {
        try {
          await port.open(options);
          await addPortToState(port);
        } catch (error) {
          return;
        }
      });
    } catch (error) {
      console.log("Get Port Error ::", error);
    } finally {
      console.log("Get Ports");
    }
  };

  const requestPort = async () => {
    try {
      if (!navigator.serial) return;
      // Serial Port 선택 창 Open

      return await navigator.serial.requestPort();
    } catch (error) {
      console.log("requested Error", error);
      return undefined;
    } finally {
      // Serial 선택 후 GetPort
      console.log("Serial 선택 후 GetPort");
      getPorts();
    }
  };

  const addPortToState = async (port: SerialPort) => {
    try {
      const textDecoder = new TextDecoderStream();
      const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
      const reader = textDecoder.readable.getReader();

      const textEncoder = new TextEncoderStream();
      const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
      const writer = textEncoder.writable.getWriter();

      port.ondisconnect = async () => {
        deleteSerialPort(port);
        // window.location.reload();
        await getPorts();
      };

      monitor({
        reader,
        port,
        writer,
        readableStreamClosed,
        writableStreamClosed,
      }).catch(() => {});

      await write({
        data: HEALTH_CHECK,
        writer,
        port,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const monitor = async ({
    port,
    reader,
    writer,
    readableStreamClosed,
    writableStreamClosed,
  }: {
    port: SerialPort;
    reader: ReadableStreamDefaultReader<string>;
    writer: WritableStreamDefaultWriter<string>;
    readableStreamClosed: Promise<void>;
    writableStreamClosed: Promise<void>;
  }) => {
    try {
      while (true) {
        const { value, done } = await reader.read();

        console.log(
          "---------------- 기기에서 넘어오는 value start ----------------"
        );
        console.log(value);
        console.log(
          "---------------- 기기에서 넘어오는 value end ----------------"
        );

        if (value) {
          if (port?.onbuffervalue) {
            port?.onbuffervalue(value);
          }
          // HEALTH CHECK & MODEL INFO
          if (value.includes("PST;Rdy")) {
            const dataField = value.trim().split(";")[2];
            if (dataField === "UP") {
              port.ismodelinfofetching = true;
              port.injectedId = nanoid();
              setConnectingPortCount((prev) => prev + 1);
              write({
                data: AT_GET_MODEL_INFO,
                port,
                writer,
              });
            }
          } else if (port.ismodelinfofetching) {
            modelVersionBufferRef.current.set(
              port.injectedId,
              (modelVersionBufferRef.current.get(port.injectedId) || "") + value
            );
            if (value.includes(CR)) {
              const modelVersionBuffer = modelVersionBufferRef.current.get(
                port.injectedId
              );
              const modelVersion = modelVersionBuffer.trim().split(";")[2];
              port.modelinfo = modelVersion;
              port.ismodelinfofetching = false;
              modelVersionBufferRef.current.set(port.injectedId, undefined);
              port.isimeifetching = true;
              write({
                data: AT_GET_IMEI,
                port,
                writer,
              });
            }
          } else if (port.isimeifetching) {
            imeiBufferRef.current.set(
              port.injectedId,
              (imeiBufferRef.current.get(port.injectedId) || "") + value
            );

            if (value.includes(CR)) {
              const imeiBuffer = imeiBufferRef.current.get(port.injectedId);
              const currentImei = imeiBuffer.trim().split(";")[1];
              const alreadyInGlobalData = portList.some(
                ({ imei }) => imei === currentImei
              );
              port.isimeifetching = false;
              if (currentImei) {
                port.imei = currentImei;
                await updateIndexedDB(
                  currentImei,
                  imeiBufferRef.current.get(port.injectedId),
                  indexeddbRef,
                  broadcastChannel
                );
                imeiBufferRef.current.set(port.injectedId, undefined);
                setConnectingPortCount((prev) => prev - 1);
                if (alreadyInGlobalData) {
                  console.log("already in store, edit Serial Port");
                  // imei로 매칭된 기기가 존재하면 port stream과 reader, writer만 할당, 나머지는 기존의 데이터 사용
                  editSerialPort({
                    payload: {
                      port,
                      readableStreamClosed,
                      writableStreamClosed,
                      writer,
                      reader,
                    },
                    imei: currentImei,
                  });

                  port.grpNo = portList.find(
                    ({ imei }) => imei === currentImei
                  ).jsonPackageCount;
                } else {
                  console.log("add new Serial Port");
                  // imei로 매칭된 기기가 존재하지 않으면 port 추가
                  addSerialPort({
                    port,
                    readableStreamClosed,
                    reader,
                    writableStreamClosed,
                    writer,
                    isReadyUp: true,
                    modelVersion: port.modelinfo,
                    jsonPackageCount: undefined,
                    rawPackage: "",
                    jsonPackage: [],
                    isPackageFetching: false,
                    imei: currentImei,
                    packageToJson: undefined,
                    isPackageError: false,
                    shouldRefetchPackage: false,
                    polygonGeofenceData: [],
                    circularGeofenceData: [],
                  });
                  port.ispackagecountfetching = true;
                  write({
                    data: AT_GET_JSON_PACKAGE_COUNT_COMMAND,
                    port,
                    writer,
                  });
                }
              }
            }
          } else if (port.ispackagecountfetching) {
            totalGrpNoBufferRef.current.set(
              port.injectedId,
              (totalGrpNoBufferRef.current.get(port.injectedId) || "") + value
            );

            if (value.includes(CR)) {
              const dataField = totalGrpNoBufferRef.current
                .get(port.injectedId)
                .trim()
                .split(";")[3];
              await updateIndexedDB(
                port.imei,
                totalGrpNoBufferRef.current.get(port.injectedId),
                indexeddbRef,
                broadcastChannel
              );
              port.grpNo = Number(dataField);
              editSerialPort({
                payload: {
                  jsonPackageCount: Number(dataField),
                },
                imei: port.imei,
              });

              const commands = Array.from(
                { length: Number(dataField) },
                (_, i) => `${AT_GET_JSON}${i + 1}`
              );
              port.ispackagecountfetching = false;
              totalGrpNoBufferRef.current.set(port.injectedId, undefined);
              port.isjsonpackagefetching = true;
              setPackageFetchingStart({ imei: port.imei });

              // json package를 가지고 올 때 생기는 병목현상을 위한 의도적인 지연입니다.
              commands.forEach((command, index) => {
                setTimeout(async () => {
                  await write({
                    data: command,
                    port,
                    writer,
                  });
                }, index * DELAY_MS); // 각 명령마다 100ms씩 지연
              });
            }
          } else if (
            value.includes("$PST;CSV;") ||
            csvBufferRef.current.get(port.imei)
          ) {
            const csv = csvBufferRef.current.get(port.imei);
            csvBufferRef.current.set(
              port.imei,
              (csv || "") + value.replace("$PST;CSV;", "")
            );

            await updateIndexedDB(
              port.imei,
              value,
              indexeddbRef,
              broadcastChannel
            );

            if (value.includes(CR)) {
              const blob = new Blob([csv], { type: "text/plain" });
              csvBufferRef.current.set(port.imei, "");
              fileDownload(blob, `${port.imei}.profile`);
              csvBufferRef.current.set(port.imei, undefined);
            }
          } else if (value.includes("RPR")) {
            await updateIndexedDB(
              port.imei,
              value,
              indexeddbRef,
              broadcastChannel
            );
            port.oneditsuccess?.();
            port.oneditsuccess = null;
          } else if (value.includes("ERR") || port.iserrorvalue) {
            await updateIndexedDB(
              port.imei,
              value,
              indexeddbRef,
              broadcastChannel
            );

            if (value.includes(CR)) {
              port.iserrorvalue = false;
              port.onprev?.();
              toast(value, { type: "error" });
              port.onprev = null;
            } else {
              port.iserrorvalue = true;
            }
          } else if (port.ispolygonfetching) {
            port.polygongeofence = (port.polygongeofence || "") + value;
            await updateIndexedDB(
              port.imei,
              value,
              indexeddbRef,
              broadcastChannel
            );

            if (value.includes("#")) {
              const hashCount = value.split("#").length - 1;
              port.polygonfetchcount =
                (port.polygonfetchcount ?? 0) + hashCount;
            }

            if (
              port.polygonfetchcount === port.polygonmax &&
              value.includes(CR)
            ) {
              setPolygonGeofence({
                payload: getGeofenceData(port.polygongeofence),
                imei: port.imei,
              });
              port.onafterpolygongeofence();
            }
          } else if (port.iscircularfetching) {
            port.circulargeofence = (port.circulargeofence || "") + value;

            await updateIndexedDB(
              port.imei,
              value,
              indexeddbRef,
              broadcastChannel
            );

            if (value.includes("#")) {
              const hashCount = value.split("#").length - 1;
              port.circularfetchcount =
                (port.circularfetchcount ?? 0) + hashCount;
            }

            if (
              port.circularfetchcount === port.circlemax &&
              value.includes(CR)
            ) {
              setCircularGeofence({
                payload: getGeofenceData(port.circulargeofence),
                imei: port.imei,
              });
              port.onaftercirculargeofence();
            }
          } else if (port.ispolygonpointfetching) {
            await updateIndexedDB(
              port.imei,
              value,
              indexeddbRef,
              broadcastChannel
            );
            port.polygonhandler(value);
          } else if (port.iscircularpointfetching) {
            await updateIndexedDB(
              port.imei,
              value,
              indexeddbRef,
              broadcastChannel
            );

            port.circlehandler(value);
          } else if (port.iscircleoutputactivefetching) {
            await updateIndexedDB(
              port.imei,
              value,
              indexeddbRef,
              broadcastChannel
            );
            port.circleoutputactivehandler(value);
          } else if (port.isjsonpackagefetching) {
            const excludePattern = new RegExp(EXCLUDE_STRING.join("|"), "g");

            await updateIndexedDB(
              port.imei,
              value,
              indexeddbRef,
              broadcastChannel
            );

            // '\u0003'에 매치되는 부분을 찾고, 패킷 버퍼 카운트를 업데이트
            const matches = value.match(/\u0003/g);
            const currentImei = port.imei;
            const currentCount =
              jsonPacketBufferCountRef.current.get(currentImei) || 0;
            const currentBuffer =
              jsonPacketBufferRef.current.get(currentImei) || "";

            // 매치된 문자열이 있는 경우 카운트 증가
            if (matches) {
              jsonPacketBufferCountRef.current.set(
                currentImei,
                currentCount + matches.length
              );
              port.onjsonpacketcountup?.(matches.length);
            }

            // 값에서 특정 문자를 제거하고 버퍼 업데이트
            const cleanedValue = value
              .replaceAll("\u0002", "")
              .replace(excludePattern, "");
            jsonPacketBufferRef.current.set(
              currentImei,
              currentBuffer + cleanedValue
            );

            // 패킷을 처리할 조건을 확인하고 처리
            const shouldProcessPacket =
              jsonPacketBufferCountRef.current.get(currentImei) === port.grpNo;

            if (shouldProcessPacket) {
              setJsonPackageOfSerialPort({
                imei: currentImei,
                payload: jsonPacketBufferRef.current.get(currentImei),
              });
              if (port.onafterjsonpacket) {
                port.onafterjsonpacket();
                port.onafterjsonpacket = null;
              }
              // 버퍼와 카운트 재설정
              jsonPacketBufferRef.current.set(currentImei, "");
              jsonPacketBufferCountRef.current.set(currentImei, 0);
              port.isjsonpackagefetching = false;
            }
          }
        }

        if (done) {
          break;
        }
      }
    } catch (error) {
      toast(error, { type: "error" });
      console.log(error);
    } finally {
      reader.releaseLock();
    }

    await readableStreamClosed.catch();
  };

  const write = async ({
    data,
    port,
    writer,
    callback,
  }: {
    data: string;
    port: SerialPort;
    writer: WritableStreamDefaultWriter<string>;
    callback?: () => void;
  }) => {
    if (port && port.writable) {
      try {
        if (callback) {
          callbackRef.current.set(port.imei, callback);
        }
        console.log(data, ":::cmd data");
        if (port.imei) {
          await addWriteLog(port.imei, data);
          broadcastChannel.postMessage({ status: "updated", imei: port.imei });
        }
        await writer.write(data + SUFFIX); // Uint8Array 전송
        return true;
      } catch (e) {
        console.error("Error writing command:", e);
        return false;
      }
    } else {
      console.error("Port is not writable or not available");
      return false;
    }
  };

  const close = async ({
    port,
    writer,
    reader,
    readableStreamClosed,
    writableStreamClosed,
  }: {
    port: SerialPort;
    writer: WritableStreamDefaultWriter<string>;
    reader: ReadableStreamDefaultReader<string>;
    readableStreamClosed: Promise<void>;
    writableStreamClosed: Promise<void>;
  }) => {
    if (reader) {
      await reader.cancel();
      await readableStreamClosed.catch(() => {});
    }
    if (writer) {
      await writer.close();
      await writableStreamClosed;
    }
    if (port) {
      try {
        await port.close();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const forget = (port: SerialPort) => {
    port.forget();
    deleteSerialPort(port);
  };

  useEffect(() => {
    getPorts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    state: { portList, connectingPortCount },
    func: {
      requestPort,
      killAllPort,
      forget,
      forgetAllPort,
      write,
      getPorts,
      addPortToState,
      monitor,
      close,
    },
  };
};

export default useSerial;
