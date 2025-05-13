import { ModelConfig } from "@/src/api/services/model/type";

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
  updateDatas: any
) => {
  try {
    const db = (await initDB()) as IDBDatabase;
    return new Promise(async (resolve, reject) => {
      // 1. 현재 저장된 데이터 가져오기
      const currentData = (await getModelDataFromIDB(modelName)) as any;
      const currentJsonData = currentData?.jsonData?.synctrak;

      if (!currentData || !currentJsonData) {
        reject(new Error(`No data found for model: ${modelName}`));
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
            console.log("sectionValue :::", sectionValue);
            console.log("updateDatas[target] :::", updateDatas[target]);

            sectionValue.value = updateDatas[target].value;

            if (updateDatas[target].alert_id) {
              sectionValue.alert_id = updateDatas[target].alert_id;
            }
          }
        }
      }

      // 3. 업데이트된 데이터 저장
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      const request = store.put({
        modelName,
        jsonData: currentData.jsonData,
        csvData: currentData.csvData,
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
  data: {
    jsonData: any;
    csvData: CsvData[];
  }
) => {
  console.log("data :::", data);
  // return;

  try {
    const db = (await initDB()) as IDBDatabase;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      const request = store.put({
        modelName,
        jsonData: data?.jsonData,
        csvData: data?.csvData,
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

export const getJsonDataFromIDB = async (modelName: string) => {
  try {
    const db = (await initDB()) as IDBDatabase;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);

      const request = store.get(modelName);

      request.onsuccess = () => resolve(request.result?.data || null);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error reading from IndexedDB:", error);
    throw error;
  }
};

export const getModelDataFromIDB = async (modelName: string) => {
  try {
    const db = (await initDB()) as IDBDatabase;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);

      const request = store.get(modelName);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error reading from IndexedDB:", error);
    throw error;
  }
};

export const deleteJsonDataFromIDB = async (modelName: string) => {
  try {
    const db = (await initDB()) as IDBDatabase;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      const request = store.delete(modelName);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error deleting from IndexedDB:", error);
    throw error;
  }
};

export const checkModelDataExists = async (
  modelName: string
): Promise<boolean> => {
  try {
    const db = (await initDB()) as IDBDatabase;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);

      const request = store.get(modelName);

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
