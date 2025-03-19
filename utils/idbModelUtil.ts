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
