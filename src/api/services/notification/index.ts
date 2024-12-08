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

const createNoti = ({
  title,
  message,
  link,
}: {
  title: string;
  message: string;
  link?: string;
}) => {
  return post<
    void,
    { title: string; message: string; link?: string; isGlobal: boolean }
  >("/api/v1/noti/publish", {
    title,
    message,
    link,
    isGlobal: true,
  });
};

export { getNoti, readNoti, createNoti };
