import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ETX } from "../hooks/useSerial/constant";

export type SerialPortState = {
  port: SerialPort;
  readableStreamClosed: Promise<void>;
  reader: ReadableStreamDefaultReader<string>;
  writableStreamClosed: Promise<void>;
  writer: WritableStreamDefaultWriter<string>;
  isReadyUp: boolean;
  modelVersion: string;
  jsonPackageCount: number;
  jsonPackage: string[];
  rawPackage: string;
  isPackageFetching: boolean;
  imei: string;
  packageToJson: { synctrak: any[] };
  isPackageError: boolean;
  shouldRefetchPackage: boolean;
};

type SerialPortAction = {
  addSerialPort: (port: SerialPortState) => void;
  deleteSerialPort: ({ imei }: { imei: string }) => void;
  editSerialPort: ({
    imei,
    payload,
  }: {
    imei: string;
    payload: Partial<SerialPortState>;
  }) => void;
  setPackageFetchingStart: ({ imei }: { imei: string }) => void;
  setJsonPackageOfSerialPort: ({
    imei,
    payload,
  }: {
    imei: string;
    payload: string;
  }) => void;
  setJsonPackageOfSerialPortForUpdate: ({
    imei,
    payload,
  }: {
    imei: string;
    payload: any[];
  }) => void;
};

export const parse = (str) => {
  try {
    // JSON 문자열이 올바른지 확인
    let parsedJson = JSON.parse(str);

    return parsedJson;
  } catch (e) {
    console.error("JSON 파싱 에러:", e.message);
    return false;
  }
};

const useSerialStore = create(
  persist<{ portList: SerialPortState[] } & SerialPortAction>(
    (set, get) => ({
      portList: [],
      addSerialPort: (port) =>
        set(() => {
          return {
            portList: [...get().portList, port],
          };
        }),
      deleteSerialPort: ({ imei }) =>
        set(() => ({
          portList: get().portList.filter((port) => port.port.imei !== imei),
        })),
      editSerialPort: ({ imei, payload }) =>
        set(() => {
          return {
            portList: get().portList.map((port) =>
              port.port.imei === imei ? { ...port, ...payload } : port
            ),
          };
        }),
      setPackageFetchingStart: ({ imei }) =>
        set(() => {
          const getState = get();
          const portInGlobalState = getState.portList.find(
            (p) => p.port.imei === imei
          );

          return {
            portList: getState.portList.map((port) =>
              port.port.imei === imei
                ? {
                    ...portInGlobalState,
                    isPackageFetching: true,
                  }
                : port
            ),
          };
        }),
      setJsonPackageOfSerialPort: ({ imei, payload }) =>
        set(() => {
          const getState = get();
          const portInGlobalState = getState.portList.find(
            (p) => p.port.imei === imei
          );

          const jsonPkgArray = payload
            .replaceAll("\r", "")
            .split(ETX)
            .filter((buffer) => !!buffer);

          const json = parse(
            jsonPkgArray
              .join("")
              .replace(/\$PST;JSON_PK;\d{2};[0-9a-fA-F]{2};/g, "")
              .replace(/,\s*([\]}])/g, "$1")
              .replace(/\0/g, "")
          );

          return {
            portList: getState.portList.map((prevPort) =>
              prevPort.port.imei === imei
                ? {
                    ...portInGlobalState,
                    rawPackage: portInGlobalState.rawPackage + payload.trim(),
                    jsonPackage: jsonPkgArray,
                    isPackageFetching: false,
                    packageToJson: json as unknown as { synctrak: any[] },
                    isPackageError: !json,
                  }
                : prevPort
            ),
          };
        }),
      setJsonPackageOfSerialPortForUpdate: ({ imei, payload }) =>
        set(() => {
          return {
            portList: get().portList.map((item) => {
              return item.imei === imei
                ? { ...item, packageToJson: { synctrak: payload } }
                : item;
            }),
          };
        }),
    }),

    {
      name: "serialStore",
    }
  )
);

export default useSerialStore;
