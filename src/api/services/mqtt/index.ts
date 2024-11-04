import { get, post, put, del } from "../../apiClient";
import { MqttServer } from "./type";

const getMqttServer = () => {
  return get<{ count: number; records: MqttServer[] }>("/api/v1/mqtt/servers");
};
const addMqttServer = (body: MqttServerBody) => {
  return post("/api/v1/mqtt/servers", body);
};
const modifyMqttServer = (body: MqttServerBody) => {
  return put("/api/v1/mqtt/servers", body);
};
const deleteMqttServer = (body: string[]) => {
  return del("/api/v1/mqtt/servers", { uid_list: body });
};

export { getMqttServer, addMqttServer, modifyMqttServer, deleteMqttServer };
