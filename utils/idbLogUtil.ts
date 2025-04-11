import { openDB } from "idb";

const DB_NAME = "CommunicationLogs";
const STORE_NAME = "USBLogs";
const DB_VERSION = 1;

// IndexedDB 초기화
const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "IMEI" });
        store.createIndex("IMEI", "IMEI", { unique: true });
      }
    },
  });
};

// 특정 USB(IMEI)의 현재 pairId 가져오기
const getCurrentPairId = async (IMEI?: string) => {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);
  const logData = await store.get(IMEI || "0");
  return logData ? logData.LogPairs.length : 0; // 현재 로그 쌍의 개수
};

// Write 로그 추가 (pairId를 1 증가시키고, 새로운 요청 데이터를 추가)
export const addWriteLog = async (IMEI: string, writeData: string) => {
  const db = await initDB();
  const currentPairId = await getCurrentPairId(IMEI); // 현재 pairId
  const newPairId = currentPairId + 1; // 먼저 pairId 증가
  const timestamp = new Date().toISOString();

  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  const existingLogs = (await store.get(IMEI)) || { IMEI, LogPairs: [] };

  // 새로운 pairId에 write 로그 추가
  existingLogs.LogPairs.push({
    pairId: newPairId,
    write: { timestamp, data: writeData },
    read: null, // 아직 응답이 없으므로 null로 설정
  });

  await store.put(existingLogs);
  await transaction.done;
};

// Read 로그 추가 (현재 pairId에 응답 데이터를 추가하고, pairId를 증가시킴)
export const addReadLog = async (IMEI: string, readData: string) => {
  const db = await initDB();
  const currentPairId = await getCurrentPairId(IMEI); // 현재 pairId 가져오기
  const timestamp = new Date().toISOString();

  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  const existingLogs = (await store.get(IMEI)) || { IMEI, LogPairs: [] };

  // 현재 pairId에 read 로그 추가
  existingLogs.LogPairs[currentPairId] = {
    pairId: currentPairId,
    read: { timestamp, data: readData },
    write: existingLogs.LogPairs[currentPairId]?.write || null, // write 로그가 있는지 확인
  };

  // 새로운 로그를 저장한 후에 pairId 증가
  await store.put(existingLogs);
  await transaction.done;
};

// 특정 USB(IMEI)의 로그 조회
export const getLogsByIMEI = async (IMEI: string) => {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);
  const result = await store.get(IMEI);
  return result ? result.LogPairs : [];
};

// 특정 IMEI의 로그만 삭제
export const clearLogsByIMEI = async (IMEI: string) => {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);

  // 해당 IMEI 레코드가 있는지 확인
  const existingLogs = await store.get(IMEI);

  if (existingLogs) {
    // 로그를 빈 배열로 초기화한 후 저장
    existingLogs.LogPairs = [];
    await store.put(existingLogs);
  }

  await transaction.done;
};

// 전체 로그 삭제
export const clearLogs = async () => {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  await store.clear();
  await transaction.done;
};
