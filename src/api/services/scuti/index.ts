import { get, post, put, del } from "../../apiClient";
import { ScutiServerBody } from "./type";

const getScutiServer = () => {
  return get<{ count: number; records: unknown[] }>("/api/v1/scuti/servers");
};
const addScutiServer = (body: ScutiServerBody) => {
  return post("/api/v1/scuti/servers", body);
};
const modifyScutiServer = (body: ScutiServerBody & { uid: string }) => {
  return put("/api/v1/scuti/servers", body);
};
const deleteScutiServer = (body: string[]) => {
  return del("/api/v1/scuti/servers", { uid_list: body });
};

export { getScutiServer, addScutiServer, modifyScutiServer, deleteScutiServer };
