import { ModelConfig } from "@/src/api/services/model/type";

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

export const saveJsonDataToIDB = async (modelName: string, jsonData: any) => {
  try {
    const db = (await initDB()) as IDBDatabase;
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      const request = store.put({
        modelName,
        data: jsonData,
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

export const updateParametersInIDB = async (
  modelName: string,
  updatedParameters: { id: number | string; [key: string]: any }[]
) => {
  try {
    const db = (await initDB()) as IDBDatabase;
    return new Promise(async (resolve, reject) => {
      // 1. 현재 저장된 데이터 가져오기
      const currentData = (await getJsonDataFromIDB(
        modelName
      )) as ModelConfig[];
      if (!currentData) {
        reject(new Error(`No data found for model: ${modelName}`));
        return;
      }

      // 2. 데이터 업데이트
      const updatedData = currentData.map((item: any) => {
        // 업데이트할 파라미터 찾기
        const updateInfo = updatedParameters.find(
          (param) => param.id === item.id
        );
        if (updateInfo) {
          // id는 유지하고 나머지 데이터만 업데이트
          const { id, ...updateData } = updateInfo;
          return {
            ...item,
            ...updateData,
          };
        }
        return item;
      });

      // 3. 업데이트된 데이터 저장
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      const request = store.put({
        modelName,
        data: updatedData,
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
