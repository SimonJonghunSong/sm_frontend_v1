import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import {
  AT_GET_JSON,
  HEALTH_CHECK,
  AT_GET_JSON_PACKAGE_COUNT_COMMAND,
  AT_GET_IMEI,
  AT_GET_MODEL_INFO,
  EXCLUDE_STRING,
  CR,
  ETX,
  AT_GET_DEVICE_VERSIONS,
} from "./constant";
import useSerialStore from "../../stores/useSerialStore";
import { fileDownload } from "@/utils/fileDownload";
import { getGeofenceData } from "./utils";
import { addReadLog, addWriteLog } from "@/utils/idbLogUtil";
import { toast } from "react-toastify";

const options = {
  baudRate: 115200,
};



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
    console.log("test imei :::::::", imei);

    if (!imei) return;

    await addReadLog(imei, (ref.current.get(imei) || "") + value);
    broadcastChannel.postMessage({ status: "updated", imei });
    ref.current.set(imei, undefined);
  } else {
    ref.current.set(imei, (ref.current.get(imei) || "") + value);
  }
};

const DELAY_MS = 300;

const useSerial = () => {
  const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const altDataBufferRef = useRef("");
  const sttDataBufferRef = useRef("");
  const deviceVersionsBufferRef = useRef("");
  const modelVersionBufferRef = useRef(new Map());
  const modemVersionBufferRef = useRef(new Map());
  const imeiBufferRef = useRef(new Map());
  const totalGrpNoBufferRef = useRef(new Map());
  const jsonPacketBufferRef = useRef(new Map());
  const jsonPacketBufferCountRef = useRef(new Map());
  const callbackRef = useRef(new Map());
  const csvBufferRef = useRef(new Map());
  const indexeddbRef = useRef(new Map());
  const alertBroadcastRef = useRef(new BroadcastChannel("err_alert"));
  const alertCommandRef = useRef<string | null>("");
  const [connectingPortCount, setConnectingPortCount] = useState(0);
  const broadcastChannel = new BroadcastChannel("command_log");
  const deviceCommandBroadcastChannel = new BroadcastChannel(
    "device_command_log"
  );
  const deviceCommandLogRef = useRef<string | null>(null);
  const loadImeiDataRef = useRef<string>("");
  const {
    portList,
    getPortList,
    addSerialPort,
    deleteSerialPort,
    editSerialPort,
    setJsonPackageOfSerialPort,
    setPackageFetchingStart,
    setCircularGeofence,
    setPolygonGeofence,
    removeAllPort,
    setIsDisconnected,
    setIsConnected,
    setIsAlreadyUnlock,
    setPassword,
    resetHasRefetching,
    setHasRefetching,
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
      console.log(allowedPortList, ":::: allowedPortList");
      allowedPortList.forEach(async (port) => {
        try {
          console.log("before open port ::::", port.connected);
          await port.open(options);
          console.log("after open port ::::", port.connected);
          await addPortToState(port);
        } catch (error) {
          if (port?.imei) {
            setHasRefetching({ imei: port.imei, value: true });
          }

          console.log(portList, "portList");
          console.log(error, port, "port open , addPortToState");
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

      port.isReadyToUse = false;
      port.isFirstLoad = true;
      port.isQuecModel = false;

      monitor({
        reader,
        port,
        writer,
        readableStreamClosed,
        writableStreamClosed,
        setHasRefetching,
      }).catch(() => {});

      setTimeout(async () => {
        setTimeout(async () => {
          if (!port.isReadyToUse) {
            window.alert(
              "Port not responding after 10 seconds, closing and forgetting"
            );
            await close({
              port,
              writer,
              reader,
              readableStreamClosed,
              writableStreamClosed,
            });
            await port.forget();
            window.location.reload();
          }
        }, 8000);
        port.isFirstLoad = false;
        await write({
          data: HEALTH_CHECK,
          writer,
          port,
        });
      }, 2000);

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
    setHasRefetching,
  }: {
    port: SerialPort;
    reader: ReadableStreamDefaultReader<string>;
    writer: WritableStreamDefaultWriter<string>;
    readableStreamClosed: Promise<void>;
    writableStreamClosed: Promise<void>;
    setHasRefetching: ({
      imei,
      value,
    }: {
      imei: string;
      value: boolean;
    }) => void;
  }) => {
    try {
      while (true) {
        const { value: valueProp, done } = await reader.read();
        let value = valueProp;

        console.log(
          "---------------- 기기에서 넘어오는 value start ----------------"
        );
        console.log(value);
        console.log(
          "---------------- 기기에서 넘어오는 value end ----------------"
        );

        if (value === "$PST;PORT_OPEN") {
          console.log("value ::::", value);
          continue;
        }

        if (port.isHealthCheck) {
          console.log("health check ::::");
          port.isHealthCheck = false;
          continue;
        }

        if (port.isFirstLoad) {
          if (isEndOfMessage(value)) {
            console.log("value :::", value.includes("ERROR"));
            // Quec 모델인 경우
            if (value.includes("OK")) {
              port.isQuecModel = true;
            }
            // Quec 모델이 아닌 경우
            if (value.includes("ERROR")) {
              port.isQuecModel = false;
            }
            port.isFirstLoad = false;
          }
        } else {
          if (port.isQuecModel) {
            value = value.replaceAll("OK", "");

            if (port.isDeviceCommandSend) {
              if (deviceCommandLogRef.current) {
                deviceCommandLogRef.current += value;
              } else {
                deviceCommandLogRef.current = value;
              }

              if (isEndOfMessage(value)) {
                deviceCommandBroadcastChannel.postMessage({
                  type: "RESPONSE",
                  timestamp: new Date().toISOString(),
                  value: deviceCommandLogRef.current,
                });
                deviceCommandLogRef.current = null;
                port.isDeviceCommandSend = false;
              }
            }

            if (port.isAlertSend) {
              if (alertCommandRef.current) {
                alertCommandRef.current += value;
              } else {
                alertCommandRef.current = value;
              }

              if (
                isEndOfMessage(value) &&
                alertCommandRef.current.includes("ERR")
              ) {
                port.isAlertSend = false;
                alertBroadcastRef.current.postMessage(alertCommandRef.current);
                alertCommandRef.current = null;
              }
            }

            if (valueProp) {
              // load imei
              if (port?.isLoadImei) {
                loadImeiDataRef.current += value;

                if (valueProp.includes("OK")) {
                  port.onLoadImei?.(loadImeiDataRef.current);
                  port.isLoadImei = false;
                  loadImeiDataRef.current = "";
                }
              }

              if (port?.onbuffervalue) {
                port?.onbuffervalue(value);
              }

              if (port?.onpolygonedit) {
                port.onpolygonedit(value);
              }

              if (value.includes("RPR")) {
                await updateIndexedDB(
                  port.imei,
                  value,
                  indexeddbRef,
                  broadcastChannel
                );
                port.oneditsuccess?.();
                port.oneditsuccess = null;
              }

              if (value.includes("ERR") || port.iserrorvalue) {
                await updateIndexedDB(
                  port.imei,
                  value,
                  indexeddbRef,
                  broadcastChannel
                );

                if (valueProp.includes("OK")) {
                  port.iserrorvalue = false;
                  port.onprev?.();
                  port.onprev = null;
                } else {
                  port.iserrorvalue = true;
                }
              }

              if (
                port.isReadyToUse &&
                (!value.includes("PST;Rdy") || !value.includes("Rdy;UP"))
              ) {
                // HEALTH CHECK & MODEL INFO
                if (port.ismodelinfofetching) {
                  modelVersionBufferRef.current.set(
                    port.injectedId,
                    (modelVersionBufferRef.current.get(port.injectedId) || "") +
                      value
                  );

                  if (valueProp.includes("OK")) {
                    const modelVersionBuffer =
                      modelVersionBufferRef.current.get(port.injectedId);
                    const modelVersion = modelVersionBuffer
                      .trim()
                      .split(";")[2];
                    const isLock =
                      modelVersionBuffer.trim().split(";")[9] === "1";

                    port.isLock = isLock;
                    port.modelinfo = modelVersion;
                    port.ismodelinfofetching = false;
                    modelVersionBufferRef.current.set(
                      port.injectedId,
                      undefined
                    );
                    port.isimeifetching = true;
                    write({
                      data: AT_GET_IMEI,
                      port,
                      writer,
                    });
                  }
                } else if (value.trim() !== "" && port.isimeifetching) {
                  imeiBufferRef.current.set(
                    port.injectedId,
                    (imeiBufferRef.current.get(port.injectedId) || "") + value
                  );

                  if (valueProp.includes("OK")) {
                    const imeiBuffer = imeiBufferRef.current.get(
                      port.injectedId
                    );
                    const currentImei =
                      imeiBuffer.match(/"I"\s*:\s*"(\d+)"/)[1];
                    const alreadyInGlobalData = getPortList().some(
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
                            isPackageRefetching: false,
                            hasRefetching: true,
                          },
                          imei: currentImei,
                        });

                        port.grpNo = getPortList().find(
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
                          isPackageRefetching: false,
                          imei: currentImei,
                          packageToJson: undefined,
                          isPackageError: false,
                          shouldRefetchPackage: false,
                          polygonGeofenceData: [],
                          circularGeofenceData: [],
                          isDisconnected: false,
                          modemVersion: "",
                          isAlreadyUnlock: false,
                          password: "",
                          hasRefetching: false,
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
                    (totalGrpNoBufferRef.current.get(port.injectedId) || "") +
                      value
                  );

                  if (valueProp.includes("OK")) {
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
                  port.isCsvFetching ||
                  csvBufferRef.current.get(port.imei)
                ) {
                  if (!fetchTimeoutRef.current) {
                    fetchTimeoutRef.current = setTimeout(() => {
                      window.alert(
                        "Port not responding after 10 seconds, read page and try again"
                      );
                      port.isCsvFetching = false;
                      port.onEndCsvDataFetched = null;
                      port.onCsvDataFetched = null;
                      window.location.reload();
                    }, 10000);
                  }

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

                  port?.onCsvDataFetched?.(value);

                  if (valueProp.includes("OK")) {
                    if (fetchTimeoutRef.current) {
                      clearTimeout(fetchTimeoutRef.current);
                      fetchTimeoutRef.current = null;
                    }

                    port.isCsvFetching = false;
                    port.onEndCsvDataFetched?.();
                    csvBufferRef.current.set(port.imei, "");
                    csvBufferRef.current.set(port.imei, undefined);
                  }
                } else if (port.isSttDataFetching) {
                  sttDataBufferRef.current += value;
                  if (valueProp.includes("OK")) {
                    port.onEndCurrentSttDataFetched?.(sttDataBufferRef.current);
                    sttDataBufferRef.current = "";
                    port.isSttDataFetching = false;
                  }
                } else if (port.isAltDataFetching) {
                  altDataBufferRef.current += value;
                  if (valueProp.includes("OK")) {
                    port.onEndCurrentAltDataFetched?.(altDataBufferRef.current);
                    altDataBufferRef.current = "";
                    port.isAltDataFetching = false;
                  }
                } else if (port.isDeviceVersionsFetching) {
                  deviceVersionsBufferRef.current += value;
                  if (valueProp.includes("OK")) {
                    port.onEndDeviceVersionsFetched?.(
                      deviceVersionsBufferRef.current
                    );
                    deviceVersionsBufferRef.current = "";
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
                    valueProp.includes("OK")
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
                    valueProp.includes("OK")
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
                  const excludePattern = new RegExp(
                    EXCLUDE_STRING.join("|"),
                    "g"
                  );

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
                    jsonPacketBufferCountRef.current.get(currentImei) ===
                    port.grpNo;

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

              if (value.includes("PST;Rdy") && !port.isReadyToUse) {
                const dataField = value.trim().split(";")[2];
                if (dataField === "UP") {
                  port.isReadyToUse = true;
                  port.ismodelinfofetching = true;
                  port.injectedId = nanoid();
                  setConnectingPortCount((prev) => prev + 1);
                  write({
                    data: AT_GET_MODEL_INFO,
                    port,
                    writer,
                  });
                }
              }
            }
          } else {
            if (port.isDeviceCommandSend) {
              if (deviceCommandLogRef.current) {
                deviceCommandLogRef.current += value;
              } else {
                deviceCommandLogRef.current = value;
              }

              if (isEndOfMessage(value)) {
                deviceCommandBroadcastChannel.postMessage({
                  type: "RESPONSE",
                  timestamp: new Date().toISOString(),
                  value: deviceCommandLogRef.current,
                });
                deviceCommandLogRef.current = null;
                port.isDeviceCommandSend = false;
              }
            }

            if (port.isAlertSend) {
              if (alertCommandRef.current) {
                alertCommandRef.current += value;
              } else {
                alertCommandRef.current = value;
              }

              console.log("value ::::", value);
              console.log(
                "alertCommandRef.current ::::",
                alertCommandRef.current
              );

              if (
                isEndOfMessage(value) &&
                alertCommandRef.current.includes("ERR")
              ) {
                port.isAlertSend = false;
                alertBroadcastRef.current.postMessage(alertCommandRef.current);
                alertCommandRef.current = null;
              }
            }

            if (value) {
              // load imei
              if (port?.isLoadImei) {
                port.onLoadImei?.(value);
              }

              if (port?.onpolygonedit) {
                port.onpolygonedit(value);
              }

              if (port?.onbuffervalue) {
                port?.onbuffervalue(value);
              }

              if (value.includes("RPR")) {
                await updateIndexedDB(
                  port.imei,
                  value,
                  indexeddbRef,
                  broadcastChannel
                );
                port.oneditsuccess?.();
                port.oneditsuccess = null;
              }

              if (value.includes("ERR") || port.iserrorvalue) {
                await updateIndexedDB(
                  port.imei,
                  value,
                  indexeddbRef,
                  broadcastChannel
                );

                if (value.includes(CR)) {
                  port.iserrorvalue = false;
                  port.onprev?.();
                  port.onprev = null;
                } else {
                  port.iserrorvalue = true;
                }
              }

              if (
                port.isReadyToUse &&
                (!value.includes("PST;Rdy") || !value.includes("Rdy;UP"))
              ) {
                // HEALTH CHECK & MODEL INFO
                if (port.ismodelinfofetching) {
                  modelVersionBufferRef.current.set(
                    port.injectedId,
                    (modelVersionBufferRef.current.get(port.injectedId) || "") +
                      value
                  );
                  if (value.includes(CR)) {
                    const modelVersionBuffer =
                      modelVersionBufferRef.current.get(port.injectedId);
                    const modelVersion = modelVersionBuffer
                      .trim()
                      .split(";")[2];
                    const isLock =
                      modelVersionBuffer.trim().split(";")[9] === "1";

                    port.isLock = isLock;
                    port.modelinfo = modelVersion;
                    port.ismodelinfofetching = false;
                    modelVersionBufferRef.current.set(
                      port.injectedId,
                      undefined
                    );
                    port.isimeifetching = true;
                    write({
                      data: AT_GET_IMEI,
                      port,
                      writer,
                    });
                  }
                } else if (value.trim() !== "" && port.isimeifetching) {
                  imeiBufferRef.current.set(
                    port.injectedId,
                    (imeiBufferRef.current.get(port.injectedId) || "") + value
                  );

                  if (value.includes(CR)) {
                    const imeiBuffer = imeiBufferRef.current.get(
                      port.injectedId
                    );
                    const currentImei =
                      imeiBuffer.match(/"I"\s*:\s*"(\d+)"/)[1];
                    const alreadyInGlobalData = getPortList().some(
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
                            isPackageRefetching: false,
                            hasRefetching: true,
                          },
                          imei: currentImei,
                        });

                        port.grpNo = getPortList().find(
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
                          isPackageRefetching: false,
                          imei: currentImei,
                          packageToJson: undefined,
                          isPackageError: false,
                          shouldRefetchPackage: false,
                          polygonGeofenceData: [],
                          circularGeofenceData: [],
                          isDisconnected: false,
                          modemVersion: "",
                          isAlreadyUnlock: false,
                          password: "",
                          hasRefetching: false,
                        });
                        if (port.isLock) {
                          port.ispackagecountfetching = true;
                          write({
                            data: AT_GET_JSON_PACKAGE_COUNT_COMMAND,
                            port,
                            writer,
                          });
                        } else {
                          port.ismodemversionfetching = true;
                          write({
                            data: AT_GET_DEVICE_VERSIONS + "04",
                            port,
                            writer,
                          });
                        }
                      }
                    }
                  }
                } else if (port.ismodemversionfetching) {
                  modemVersionBufferRef.current.set(
                    port.injectedId,
                    (modemVersionBufferRef.current.get(port.injectedId) || "") +
                      value
                  );

                  if (
                    value.includes(CR) &&
                    !!modemVersionBufferRef.current.get(port.injectedId)
                  ) {
                    // RES;0000000000;03;04;04;EG915ULAABR03A06M08_01.200.01.200

                    const modemVersionBuffer =
                      modemVersionBufferRef.current.get(port.injectedId);
                    const modemVersion =
                      modemVersionBuffer?.trim().split(";")?.[5] || "";
                    port.ismodemversionfetching = false;
                    port.modemversion = modemVersion;

                    editSerialPort({
                      imei: port.imei,
                      payload: {
                        modemVersion,
                      },
                    });

                    console.log("modemVersion :::", port);

                    modemVersionBufferRef.current.set(
                      port.injectedId,
                      undefined
                    );
                    port.ispackagecountfetching = true;
                    write({
                      data: AT_GET_JSON_PACKAGE_COUNT_COMMAND,
                      port,
                      writer,
                    });
                  }
                } else if (port.ispackagecountfetching) {
                  totalGrpNoBufferRef.current.set(
                    port.injectedId,
                    (totalGrpNoBufferRef.current.get(port.injectedId) || "") +
                      value
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
                  port.isCsvFetching ||
                  csvBufferRef.current.get(port.imei)
                ) {
                  if (!fetchTimeoutRef.current) {
                    fetchTimeoutRef.current = setTimeout(() => {
                      window.alert(
                        "Port not responding after 10 seconds, read page and try again"
                      );
                      port.isCsvFetching = false;
                      port.onEndCsvDataFetched = null;
                      port.onCsvDataFetched = null;
                      window.location.reload();
                    }, 10000);
                  }

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

                  port?.onCsvDataFetched?.(value);

                  if (isEndOfMessage(value)) {
                    if (fetchTimeoutRef.current) {
                      clearTimeout(fetchTimeoutRef.current);
                      fetchTimeoutRef.current = null;
                    }

                    port.isCsvFetching = false;
                    port.onEndCsvDataFetched?.();
                    csvBufferRef.current.set(port.imei, "");
                    csvBufferRef.current.set(port.imei, undefined);
                  }
                } else if (port.isSttDataFetching) {
                  sttDataBufferRef.current += value;
                  if (isEndOfMessage(value)) {
                    port.onEndCurrentSttDataFetched?.(sttDataBufferRef.current);
                    sttDataBufferRef.current = "";
                    port.isSttDataFetching = false;
                  }
                } else if (port.isAltDataFetching) {
                  altDataBufferRef.current += value;

                  if (isEndOfMessage(value)) {
                    port.onEndCurrentAltDataFetched?.(altDataBufferRef.current);
                    altDataBufferRef.current = "";
                    port.isAltDataFetching = false;
                  }
                } else if (port.isDeviceVersionsFetching) {
                  deviceVersionsBufferRef.current += value;
                  if (isEndOfMessage(value)) {
                    port.onEndDeviceVersionsFetched?.(
                      deviceVersionsBufferRef.current
                    );
                    deviceVersionsBufferRef.current = "";
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

                  console.log("value ::::", value);

                  console.log(
                    "port.polygonfetchcount :::",
                    port.polygonfetchcount
                  );

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

                  console.log(
                    "port.circularfetchcount ::::",
                    port.circularfetchcount
                  );

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
                  const excludePattern = new RegExp(
                    EXCLUDE_STRING.join("|"),
                    "g"
                  );

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
                    jsonPacketBufferCountRef.current.get(currentImei) ===
                    port.grpNo;

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

              if (value.includes("PST;Rdy") && !port.isReadyToUse) {
                const dataField = value.trim().split(";")[2];
                if (dataField === "UP") {
                  port.isReadyToUse = true;
                  port.ismodelinfofetching = true;
                  port.injectedId = nanoid();
                  setConnectingPortCount((prev) => prev + 1);
                  write({
                    data: AT_GET_MODEL_INFO,
                    port,
                    writer,
                  });
                }
              }
            }
          }
        }

        if (done) {
          break;
        }
      }
    } catch (error) {
      // toast(error, { type: "error" });

      if (port.isQuecModel) {
        console.log("reader ::::", reader);
        console.log("writer ::::", writer);
        deleteSerialPort(port);

        reader.cancel();
        reader.releaseLock();
        writer.close();
        writer.releaseLock();
        port.close();
      }

      toast.error(error.message);

      setHasRefetching({ imei: port.imei, value: true });
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
    console.log("Write attempt - Port state:", {
      portExists: !!port,
      portWritable: port?.writable,
      portConnected: port?.connected,
      portReadyState: port?.readyState,
      imei: port?.imei
    });

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

        if (port.isFirstLoad) {
          await writer.write(`AT+ST="${data}"` + CR); // Uint8Array 전송
        } else {
          if (port.isQuecModel) {
            await writer.write(`AT+ST="${data}"` + CR); // Uint8Array 전송
          } else {
            const SUFFIX = '\n';
            // AT+EGMR=0,7 명령어에 대해서는 \r\n을 추가
            if (data.startsWith('AT+EGMR=0,7') || data.startsWith('AT+CGSN')) {
              await writer.write(data + CR + SUFFIX); // Uint8Array 전송
            } else {
              await writer.write(data + SUFFIX); // Uint8Array 전송
            }
          }
        }
        return true;
      } catch (e) {
        console.error("Error writing command:", e);
        return false;
      }
    } else {
      console.error("Port is not writable or not available", {
        portExists: !!port,
        portWritable: port?.writable,
        portConnected: port?.connected,
        portReadyState: port?.readyState,
        imei: port?.imei
      });
      
      // 포트 상태가 좋지 않으면 포트를 재연결 시도
      if (port?.imei) {
        console.log("Attempting to reconnect port:", port.imei);
        setHasRefetching({ imei: port.imei, value: true });
      }
      
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

  const removePorts = () => {
    removeAllPort();
  };

  useEffect(() => {
    resetHasRefetching();
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
      removePorts,
      setIsDisconnected,
      setIsConnected,
      setIsAlreadyUnlock,
      setPassword,
    },
  };
};

export default useSerial;
