import { get, post, put, del } from "../../apiClient";
import { User, UserBody } from "./type";

const getUsers = () => {
  return get<{
    count: number;
    response: { code: number; reason: string };
    user_list: User[];
  }>("/api/v1/user");
};
const addUser = (body: UserBody) => {
  return post("/api/v1/user", body);
};
const modifyUser = (body: UserBody) => {
  return put("/api/v1/user", body);
};
const deleteUser = (body: string[]) => {
  console.log("deleteUser", body);
  return del("/api/v1/users", { user_id_list: body });
};

export { getUsers, addUser, modifyUser, deleteUser };
