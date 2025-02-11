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

const getAdminNoti = async () => {
  return {
    data: {
      records: [
        {
          uid: "1",
          title: "test",
          creator: "test",
          created: "2025-01-10 12:30:00",
          status: "Send",
          sended: "2025-01-10 12:30:10",
        },
        {
          uid: "2",
          title: "test",
          creator: "test",
          created: "2025-01-10 12:30:00",
          status: "Send",
          sended: "2025-01-10 12:30:10",
        },
        {
          uid: "3",
          title: "test",
          creator: "test",
          created: "2025-01-10 12:30:00",
          status: "Send",
          sended: "2025-01-10 12:30:10",
        },
        {
          uid: "4",
          title: "test",
          creator: "test",
          created: "2025-01-10 12:30:00",
          status: "Send",
          sended: "2025-01-10 12:30:10",
        },
      ],
      count: 10,
    },
  };
};
const deleteNotify = (body: string[]) => {
  return del("/api/v1/noti", { uid_list: body });
};

export { getNoti, readNoti, createNoti, getAdminNoti, deleteNotify };
