import { useEffect, useRef } from "react";
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
import { fileDownload } from "../../../utils/fileDownload";

const options = {
  baudRate: 115200,
};

const SUFFIX = "\n";

export const delayPromise = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const DELAY_MS = 300;

const useSerial = () => {
  const jsonPacketBufferRef = useRef(new Map());
  const jsonPacketBufferCountRef = useRef(new Map());
  const csvBufferRef = useRef(new Map());
  const {
    portList,
    addSerialPort,
    deleteSerialPort,
    editSerialPort,
    setJsonPackageOfSerialPort,
    setPackageFetchingStart,
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
        console.log(value);

        if (value) {
          // HEALTH CHECK & MODEL INFO
          if (value.includes("$PST;Rdy") || value.includes("$PST;Ver;")) {
            const dataField = value.trim().split(";")[2];

            if (value.includes("$PST;Rdy") && dataField === "UP") {
              write({
                data: AT_GET_IMEI,
                port,
                writer,
              });
            }

            if (value.includes("$PST;Ver;")) {
              editSerialPort({
                payload: {
                  modelVersion: dataField,
                },
                imei: port.imei,
              });

              write({
                data: AT_GET_JSON_PACKAGE_COUNT_COMMAND,
                port,
                writer,
              });
            }
          } else if (value.includes("RES;")) {
            const dataField = value.trim().split(";")[1];
            const alreadyInGlobalData = portList.some(
              ({ imei }) => imei === dataField
            );
            if (dataField) {
              port.imei = dataField;
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
                  imei: dataField,
                });
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
                  modelVersion: undefined,
                  jsonPackageCount: undefined,
                  rawPackage: "",
                  jsonPackage: [],
                  isPackageFetching: false,
                  imei: dataField,
                  packageToJson: undefined,
                  isPackageError: false,
                });

                write({
                  data: AT_GET_MODEL_INFO,
                  port,
                  writer,
                });
              }
            }
          } else if (value.includes("$PST;StartJSON;TotalGrpNo;")) {
            const dataField = value.trim().split(";")[3];
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

            setPackageFetchingStart({ imei: port.imei });

            // json package를 가지고 올 때 생기는 병목현상을 위한 의도적인 지연입니다.
            for (const command of commands) {
              await delayPromise(DELAY_MS); // 300ms 지연

              write({
                data: command,
                port,
                writer,
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

            if (value.includes(CR)) {
              const blob = new Blob([csv], { type: "text/plain" });
              csvBufferRef.current.set(port.imei, "");
              fileDownload(blob, `${port.imei}.profile`);
              csvBufferRef.current.set(port.imei, undefined);
            }
          } else if (value.includes("RPR") || value.includes("USP")) {
            // return;
          } else {
            console.log(value);
            const excludePattern = new RegExp(EXCLUDE_STRING.join("|"), "g");

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

              // 버퍼와 카운트 재설정
              jsonPacketBufferRef.current.set(currentImei, "");
              jsonPacketBufferCountRef.current.set(currentImei, 0);
            }
          }
        }

        if (done) {
          break;
        }
      }
    } catch (error) {
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
  }: {
    data: string;
    port: SerialPort;
    writer: WritableStreamDefaultWriter<string>;
  }) => {
    if (port && port.writable) {
      try {
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
  }, []);

  return {
    state: { portList },
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
