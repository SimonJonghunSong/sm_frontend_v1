import { login, me } from "@/src/api/services/auth";
import { ModelPkg } from "@/src/api/services/model/type";
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

        if (!store.indexNames.contains("email")) {
          store.createIndex("email", ["response.email"], {
            unique: false,
          });
        }

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
export const getUserByEmail = async (email: string) => {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, "readonly");
  const store = transaction.objectStore(STORE_NAME);

  // 인덱스 접근
  const index = store.index("email");

  // id로 데이터 검색
  const user = await index.get([email]);

  console.log("user :::", user);

  await transaction.done;

  if (user) {
    console.log("User found:", user);
  } else {
    console.log("No user found with Email:", email);
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
  me: string;
}) => {
  const { id, password, country, ...rest } = data;

  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);

  try {
    const index = store.index("email");

    // id로 데이터 검색
    const existingUser = await index.get([data.email]);

    console.log("existingUser ::::", existingUser);

    let user;

    if (existingUser) {
      user = {
        ...existingUser,
        response: { ...rest },
      };
    } else {
      user = {
        key: id,
        password: base64Encoded(password),
        country,
        modelPkgData: {},
        response: { ...rest },
      };
    }

    await store.put(user);
    await transaction.done;

    return user;
  } catch (e) {
    throw e;
  }
};

// 오프라인 로그인 처리
export const offlineLogin = async (body: AuthLoginBody) => {
  const user = await getUserByIdAndPassword(
    body.username,
    base64Encoded(body.password)
  );

  if (!user) {
    return null;
  }

  console.log("user :::", user);

  return user;
};

// 온라인 전환시 재로그인 처리
export const olineChangeWithLogin = async (userId: string) => {
  const loginUser = await getUserByEmail(userId);

  console.log("loginUser ::", loginUser);

  if (!loginUser) {
    return null;
  }

  const res = await login({
    username: loginUser.key,
    password: base64Decoded(loginUser.password),
    country: loginUser.country,
  });

  const meRes = await me();

  insertLoginUser({
    id: loginUser.key,
    password: base64Decoded(loginUser.password),
    country: loginUser.country,
    me: JSON.stringify(meRes.data.parameter.user),
    ...res.data.parameter,
  });

  return res;
};

const base64Encoded = (value: string) => {
  return btoa(value);
};
const base64Decoded = (value: string) => {
  return atob(value);
};

// email로 조회 후 modelPkgData만 업데이트
export const updateModelPkgDataByEmail = async (
  email: string,
  modelPkgData: Record<string, ModelPkg>
) => {
  const db = await initDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);

  // email 인덱스로 유저 데이터 조회
  const emailIndex = store.index("email");
  const existingUser = await emailIndex.get([email]);

  if (!existingUser) {
    console.error(`No user found with email "${email}".`);
    return null;
  }

  // modelPkgData만 업데이트
  const updatedUser = {
    ...existingUser,
    modelPkgData: { ...modelPkgData }, // modelPkgData 필드만 덮어쓰기
  };

  // 업데이트된 데이터 저장
  await store.put(updatedUser);
  await transaction.done;

  console.log(
    `modelPkgData for user with email "${email}" updated successfully.`
  );
  return updatedUser;
};
