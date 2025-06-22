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
  circularGeofenceData: string[];
  polygonGeofenceData: string[];
  isDisconnected: boolean;
  modemVersion: string;
  isAlreadyUnlock: boolean;
  password?: string;
  isPackageRefetching: boolean;
  hasRefetching: boolean;
};

type SerialPortAction = {
  addSerialPort: (port: SerialPortState) => void;
  deleteSerialPort: ({ imei }: { imei: string }) => void;
  getPortList: () => SerialPortState[];
  removeAllPort: () => void;
  editSerialPort: ({
    imei,
    payload,
  }: {
    imei: string;
    payload: Partial<SerialPortState>;
  }) => void;
  setPackageFetchingStart: ({ imei }: { imei: string }) => void;
  setPackageRefetchingStart: ({ imei }: { imei: string }) => void;
  setPackageRefetchingEnd: ({ imei }: { imei: string }) => void;
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
  setCircularGeofence: ({
    imei,
    payload,
  }: {
    imei: string;
    payload: string[];
  }) => void;
  setPolygonGeofence: ({
    imei,
    payload,
  }: {
    imei: string;
    payload: string[];
  }) => void;
  setShouldFetchJsonPackage: ({ imei }: { imei: string }) => void;
  getPolygonData: ({ imei }: { imei: string }) => string[];
  getCircularData: ({ imei }: { imei: string }) => string[];
  setIsDisconnected: ({ imei }: { imei: string }) => void;
  setIsConnected: ({ imei }: { imei: string }) => void;
  setIsAlreadyUnlock: ({ imei }: { imei: string }) => void;
  setPassword: ({ imei, password }: { imei: string; password: string }) => void;
  setHasRefetching: ({ imei, value }: { imei: string; value: boolean }) => void;
  resetHasRefetching: () => void;
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
      getPortList: () => get().portList,
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
      removeAllPort: () => set(() => ({ portList: [] })),
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
                    isPackageError: false,
                  }
                : port
            ),
          };
        }),
      setPackageRefetchingStart: ({ imei }) =>
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
                    isPackageRefetching: true,
                    isPackageError: false,
                  }
                : port
            ),
          };
        }),
      setPackageRefetchingEnd: ({ imei }) =>
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
                    isPackageFetching: false,
                    isPackageRefetching: false,
                    isPackageError: false,
                  }
                : port
            ),
          };
        }),
      setHasRefetching: ({ imei, value }) =>
        set(() => {
          const getState = get();

          console.log("setHasRefetching ::::::@::@:@::::");

          return {
            portList: getState.portList.map((port) =>
              port.port.imei === imei
                ? {
                    ...port,
                    hasRefetching: value,
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

          console.log("jsonPkgArray ::::", jsonPkgArray);

          console.log(
            "test :::::",
            jsonPkgArray
              .join("")
              .replaceAll("OK", "")
              .replace(/\$PST;JSON_PK;\d{2};[0-9a-fA-F]{2};/g, "")
              .replace(/\AT+ST="AT^$ReqJsonPk;No;\d{1,2}"/g, "")
              .replace(/,\s*([\]}])/g, "$1")
              .replace(/\0/g, "")
          );

          const json = parse(
            jsonPkgArray
              .join("")
              .replaceAll("OK", "")
              .replace(/\$PST;JSON_PK;\d{2};[0-9a-fA-F]{2};/g, "")
              .replace(/\AT+ST="AT^$ReqJsonPk;No;\d{1,2}"/g, "")
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
                    shouldRefetchPackage: false,
                    packageToJson: json as unknown as { synctrak: any[] },
                    isPackageError: !json,
                    isPackageRefetching: false,
                    hasRefetching: true,
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

      setCircularGeofence: ({ imei, payload }) =>
        set(() => {
          return {
            portList: get().portList.map((item) => {
              return item.imei === imei
                ? { ...item, circularGeofenceData: payload }
                : item;
            }),
          };
        }),
      setPolygonGeofence: ({ imei, payload }) =>
        set(() => {
          console.log("payload ::::", payload);

          return {
            portList: get().portList.map((item) => {
              return item.imei === imei
                ? { ...item, polygonGeofenceData: payload }
                : item;
            }),
          };
        }),
      setShouldFetchJsonPackage: ({ imei }) =>
        set(() => {
          return {
            portList: get().portList.map((item) => {
              return item.imei === imei
                ? { ...item, shouldRefetchPackage: true }
                : item;
            }),
          };
        }),
      getPolygonData: ({ imei }) => {
        const currentPort = get().portList.find(
          (item) => item.port.imei === imei
        );
        return currentPort.polygonGeofenceData;
      },
      getCircularData: ({ imei }) => {
        const currentPort = get().portList.find(
          (item) => item.port.imei === imei
        );
        return currentPort.circularGeofenceData;
      },
      setIsDisconnected: ({ imei }) =>
        set(() => {
          return {
            portList: get().portList.map((item) => {
              return item.imei === imei
                ? { ...item, isDisconnected: true }
                : item;
            }),
          };
        }),
      setIsConnected: ({ imei }) =>
        set(() => {
          return {
            portList: get().portList.map((item) => {
              return item.imei === imei
                ? { ...item, isDisconnected: false }
                : item;
            }),
          };
        }),
      setIsAlreadyUnlock: ({ imei }) =>
        set(() => {
          return {
            portList: get().portList.map((item) => {
              return item.imei === imei
                ? { ...item, isAlreadyUnlock: true }
                : item;
            }),
          };
        }),
      setPassword: ({ imei, password }) =>
        set(() => {
          return {
            portList: get().portList.map((item) => {
              return item.imei === imei
                ? { ...item, password: password }
                : item;
            }),
          };
        }),
      resetHasRefetching: () => {
        set(() => {
          return {
            portList: get().portList.map((item) => {
              return { ...item, hasRefetching: false };
            }),
          };
        });
      },
    }),
    {
      name: "serialStore",
    }
  )
);

export default useSerialStore;
