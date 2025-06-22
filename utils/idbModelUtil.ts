import { ModelConfig } from "@/src/api/services/model/type";

// enterAlert
// exitAlert
// showOutputActive
// outputActive
// outputKeepActive
// outputActiveDelay
// buzzerSpeedLimit
// antiJamming

export interface IDBCircularGeofence {
  id?: number;
  latitude: number;
  longitude: number;
  distance: number; // radius
  enterAlert: boolean;
  exitAlert: boolean;
  showOutputActive: boolean;
  outputActive: string;
  outputActiveDelay?: string;
  outputKeepActive?: boolean;
  buzzerSpeedLimit?: boolean;
  speed1?: string;
  speed2?: string;
  speedLimitDebounce?: string;
  antiJamming?: boolean;
}

export interface IDBPolygonGeofence {
  id: number;
  coordinates: Array<{ lat: number; lng: number }>;
  enterAlert: boolean;
  exitAlert: boolean;
  buzzerSpeedLimit?: string;
  speedLimit?: string;
  speedLimitDebounce?: string; // Polygon Speed limit
}

export interface IDBGeofence {
  circular: IDBCircularGeofence[];
  polygon: IDBPolygonGeofence[];
}

export interface IDBModelData {
  jsonData: any;
  csvData: CsvData[];
  geofence?: IDBGeofence;
}

export interface CsvData {
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  p5: string;
  p6: string;
  p7: string;
  p8: string;
  p9: string;
}

const DB_NAME = "DeviceDB";
const DB_VERSION = 1;
const STORE_NAME = "deviceJsonData";

export const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "modelName" });
      }
    };
  });
};

export const updateJsonDataToIDB = async (
  modelName: string,
  fwVersion: string,
  targetCountry: string[],
  updateDatas: any,
  geofence?: IDBGeofence
) => {
  try {
    console.log("updateDatas  ::::", updateDatas);

    const db = (await initDB()) as IDBDatabase;
    return new Promise(async (resolve, reject) => {
      // 1. 현재 저장된 데이터 가져오기
      const currentData = (await getModelDataFromIDB(
        modelName,
        fwVersion,
        targetCountry
      )) as any;
      console.log("currentData ::::", currentData);

      const currentJsonData = currentData?.jsonData?.synctrak;

      if (!currentData || !currentJsonData) {
        reject(
          new Error(
            `No data found for model: ${modelName}_${fwVersion}${
              targetCountry ? `_${targetCountry.join("_")}` : ""
            }`
          )
        );
        return;
      }

      let firstKey = 1;
      let secondKey = 0;

      for (let i = 1; i < currentJsonData.length; i++) {
        firstKey = i;
        const sectionData = currentJsonData[i];
        const sectionInfo = Object.values(
          Object.values(sectionData)[0][0]
        )[0][0];

        const tabId =
          sectionInfo.tab_id < 10
            ? `0${sectionInfo.tab_id}`
            : sectionInfo.tab_id;

        const targets = Object.keys(updateDatas).filter(
          (item: string) => item.slice(0, 2) === tabId
        );

        if (!targets.length) {
          continue;
        }

        const sectionValues = Object.values(sectionData)[0] as any[];

        for (let j = 1; j < sectionValues.length; j++) {
          secondKey = j;

          const sectionValue = Object.values(sectionValues[j])[0][0];

          const jsonId = `${tabId}${
            sectionValue.ID < 10 ? `0${sectionValue.ID}` : sectionValue.ID
          }`;

          const target = targets.find((item) => item === jsonId);

          if (target) {
            sectionValue.value = updateDatas[target].value;

            if (updateDatas[target].alert_id) {
              sectionValue.alert_id = updateDatas[target].alert_id;
            }

            if (updateDatas[target].text_num) {
              sectionValue.text_num = updateDatas[target].text_num;
            }
          }
        }
      }

      // 3. 업데이트된 데이터 저장
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      const request = store.put({
        modelName: `${modelName}_${fwVersion}${
          targetCountry ? `_${targetCountry.join("_")}` : ""
        }`,
        jsonData: currentData.jsonData,
        csvData: currentData.csvData,
        geofence: geofence ||
          currentData.geofence || { circular: [], polygon: [] },
        updatedAt: new Date(),
      });

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error updating parameters in IndexedDB:", error);
    throw error;
  }
};

export const saveJsonDataToIDB = async (
  modelName: string,
  fwVersion: string,
  targetCountry: string[],
  data: {
    jsonData: any;
    csvData: CsvData[];
    geofence?: IDBGeofence;
  }
) => {
  try {
    const db = (await initDB()) as IDBDatabase;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      const request = store.put({
        modelName: `${modelName}_${fwVersion}${
          targetCountry ? `_${targetCountry.join("_")}` : ""
        }`,
        jsonData: data?.jsonData,
        csvData: data?.csvData,
        geofence: data?.geofence || { circular: [], polygon: [] },
        updatedAt: new Date(),
      });
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error saving to IndexedDB:", error);
    throw error;
  }
};

export const getJsonDataFromIDB = async (
  modelName: string,
  fwVersion: string,
  targetCountry: string[]
) => {
  try {
    const db = (await initDB()) as IDBDatabase;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);

      const request = store.get(
        `${modelName}_${fwVersion}${
          targetCountry ? `_${targetCountry.join("_")}` : ""
        }`
      );

      request.onsuccess = () => resolve(request.result?.jsonData || null);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error reading from IndexedDB:", error);
    throw error;
  }
};

export const getModelDataFromIDB = async (
  modelName: string,
  fwVersion: string,
  targetCountry: string[]
): Promise<IDBModelData | null> => {
  try {
    const db = (await initDB()) as IDBDatabase;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);

      const request = store.get(
        `${modelName}_${fwVersion}${
          targetCountry ? `_${targetCountry.join("_")}` : ""
        }`
      );

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error reading from IndexedDB:", error);
    throw error;
  }
};

export const deleteJsonDataFromIDB = async (
  modelName: string,
  fwVersion: string,
  targetCountry: string[]
) => {
  try {
    const db = (await initDB()) as IDBDatabase;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      const request = store.delete(
        `${modelName}_${fwVersion}${
          targetCountry ? `_${targetCountry.join("_")}` : ""
        }`
      );

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error deleting from IndexedDB:", error);
    throw error;
  }
};

export const checkModelDataExists = async (
  modelName: string,
  fwVersion: string,
  targetCountry: string[]
): Promise<boolean> => {
  try {
    const db = (await initDB()) as IDBDatabase;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);

      const request = store.get(
        `${modelName}_${fwVersion}${
          targetCountry ? `_${targetCountry.join("_")}` : ""
        }`
      );

      request.onsuccess = () => {
        const data = request.result;
        resolve(!!data);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error checking data in IndexedDB:", error);
    return false;
  }
};

/**
 * modelData에 polygon geofence만 추가(또는 갱신)하는 함수
 * @param modelName 모델명
 * @param polygons 추가/갱신할 polygon geofence 배열
 */
export const updatePolygonGeofenceToIDB = async (
  modelName: string,
  fwVersion: string,
  targetCountry: string[],
  polygons: IDBPolygonGeofence[]
) => {
  const modelData = (await getModelDataFromIDB(
    modelName,
    fwVersion,
    targetCountry
  )) as IDBModelData | null;

  const newModelData: IDBModelData = {
    jsonData: modelData?.jsonData ?? {},
    csvData: modelData?.csvData ?? [],
    geofence: {
      circular: modelData?.geofence?.circular || [],
      polygon: polygons,
    },
  };

  await saveJsonDataToIDB(modelName, fwVersion, targetCountry, newModelData);
};

export const upsertCircularGeofencesToIDB = async (
  modelName: string,
  fwVersion: string,
  targetCountry: string[],
  newCirculars: IDBCircularGeofence[]
) => {
  // 1. 기존 데이터 불러오기
  const modelData = (await getModelDataFromIDB(
    modelName,
    fwVersion,
    targetCountry
  )) as IDBModelData | null;

  const oldCirculars = modelData?.geofence?.circular || [];

  // 2. id 기준으로 merge
  const merged = [...oldCirculars];
  newCirculars.forEach((newItem) => {
    const idx = merged.findIndex((item) => item.id === newItem.id);
    if (idx !== -1) {
      merged[idx] = { ...merged[idx], ...newItem }; // 업데이트
    } else {
      merged.push(newItem); // 새로 추가
    }
  });

  // 3. 저장
  const newModelData: IDBModelData = {
    jsonData: modelData?.jsonData ?? {},
    csvData: modelData?.csvData ?? [],
    geofence: {
      circular: merged,
      polygon: modelData?.geofence?.polygon || [],
    },
  };

  await saveJsonDataToIDB(modelName, fwVersion, targetCountry, newModelData);
};

export const upsertPolygonGeofencesToIDB = async (
  modelName: string,
  fwVersion: string,
  targetCountry: string[],
  newPolygons: IDBPolygonGeofence[]
) => {
  const modelData = (await getModelDataFromIDB(
    modelName,
    fwVersion,
    targetCountry
  )) as IDBModelData | null;

  const oldPolygons = modelData?.geofence?.polygon || [];

  const merged = [...oldPolygons];
  newPolygons.forEach((newItem) => {
    const idx = merged.findIndex((item) => item.id === newItem.id);
    if (idx !== -1) {
      merged[idx] = { ...merged[idx], ...newItem };
    } else {
      merged.push(newItem);
    }
  });

  const newModelData: IDBModelData = {
    jsonData: modelData?.jsonData ?? {},
    csvData: modelData?.csvData ?? [],
    geofence: {
      circular: modelData?.geofence?.circular || [],
      polygon: merged,
    },
  };

  await saveJsonDataToIDB(modelName, fwVersion, targetCountry, newModelData);
};

export const deletePolygonGeofenceFromIDB = async (
  modelName: string,
  fwVersion: string,
  targetCountry: string[],
  id: number
) => {
  const modelData = await getModelDataFromIDB(
    modelName,
    fwVersion,
    targetCountry
  );
  if (!modelData) return;

  const newPolygons = (modelData.geofence?.polygon || []).filter(
    (item) => item.id !== id
  );

  const newModelData: IDBModelData = {
    jsonData: modelData.jsonData,
    csvData: modelData.csvData,
    geofence: {
      circular: modelData.geofence?.circular || [],
      polygon: newPolygons,
    },
  };

  await saveJsonDataToIDB(modelName, fwVersion, targetCountry, newModelData);
};

export const deleteCircularGeofenceFromIDB = async (
  modelName: string,
  fwVersion: string,
  targetCountry: string[],
  id: number
) => {
  const modelData = await getModelDataFromIDB(
    modelName,
    fwVersion,
    targetCountry
  );
  if (!modelData) return;

  const newCirculars = (modelData.geofence?.circular || []).filter(
    (item) => item.id !== id
  );

  const newModelData: IDBModelData = {
    jsonData: modelData.jsonData,
    csvData: modelData.csvData,
    geofence: {
      circular: newCirculars,
      polygon: modelData.geofence?.polygon || [],
    },
  };

  await saveJsonDataToIDB(modelName, fwVersion, targetCountry, newModelData);
};
