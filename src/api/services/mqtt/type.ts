// MQTT 서버 관련 타입
export interface MqttServerBody {
  country: string;
  region: string;
  ip: string;
  port: string;
  name: string;
  description: string;
}

export interface MqttServerDeleteBody {
  ip: string;
  port: string;
}

export interface MqttServer {
  country: string;
  description: string;
  ip: string;
  name: string;
  port: string;
  reg_date: string;
  region: string;
  uid: string;
  updated: string;
  __v: number;
  _id: string;
}
