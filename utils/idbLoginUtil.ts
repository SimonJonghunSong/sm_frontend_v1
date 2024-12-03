import useAuthStore from "@/utils/useAuthStore";
import { openDB } from "idb";

const DB_NAME = "UserDatabase";
const STORE_NAME = "user_login";
const DB_VERSION = 3;

interface UserTable {
  user_login: {
    key: string;
    value: {
      user_password: string;
      response: Record<string, any>;
    };
  };
}

// IndexedDB 초기화
const initDB = async () => {
  return openDB<UserTable>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "key" });

        console.log("store.indexNames :::", store.indexNames);

        if (!store.indexNames.contains("key_passowrd")) {
          store.createIndex("key_passowrd", ["key", "password"], {
            unique: false,
          });
        }
      }
    },
  });
};

// 유저 정보 가져오기
export const getUserByIdAndPassword = async (id: string, password: string) => {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);

  // 인덱스 접근
  const index = store.index("key_passowrd");

  // id와 password로 데이터 검색
  const user = await index.get([id, password]);
  await transaction.done;

  if (user) {
    console.log("User found:", user);
  } else {
    console.log("No user found with ID and password:", id, password);
  }

  return user;
};

// 로그인시 데이터 저장
export const insertLoginUser = async (data: {
  id: string;
  password: string;
  country: string;
  accessToken: string;
  email: string;
  refreshToken: string;
  role: string;
}) => {
  const { id, password, country, ...rest } = data;

  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);

  const user = {
    key: id,
    password: base64Encoded(password),
    country,
    response: rest,
  };

  await store.put(user);
  await transaction.done;

  return user;
};

// 오프라인 로그인 처리
export const offlineLogin = async (body: AuthLoginBody) => {
  const user = await getUserByIdAndPassword(
    body.user_id,
    base64Encoded(body.password)
  );

  if (!user) {
    return null;
  }

  return user;
};

const base64Encoded = (value: string) => {
  return btoa(value);
};
const base64Decoded = (value: string) => {
  return atob(value);
};
