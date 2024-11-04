// Scuti 서버 관련 타입 (MQTT와 동일한 구조)
export interface ScutiServerBody {
  country: string;
  region: string;
  ip: string;
  port: string;
  name: string;
  description: string;
}

export interface ScutiServerDeleteBody {
  ip: string;
  port: string;
}
