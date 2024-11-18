import { get, post, put, del } from "../../apiClient";
import { GetNotificationRes } from "./type";

const getNoti = () => {
  return get<{ count: number; records: GetNotificationRes[] }>(
    "/api/v1/my/noti"
  );
};

const readNoti = (uid_list: string[]) => {
  return put<void, { uid_list: string[] }>("/api/v1/my/noti/read-done", {
    uid_list,
  });
};

// const getScutiServer = () => {
//   return get<{ count: number; records: unknown[] }>("/api/v1/scuti/servers");
// };
// const addScutiServer = (body: ScutiServerBody) => {
//   return post("/api/v1/scuti/servers", body);
// };
// const modifyScutiServer = (body: ScutiServerBody & { uid: string }) => {
//   return put("/api/v1/scuti/servers", body);
// };
// const deleteScutiServer = (body: string[]) => {
//   return del("/api/v1/scuti/servers", { uid_list: body });
// };

export { getNoti, readNoti };
