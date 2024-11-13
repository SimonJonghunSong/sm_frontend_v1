// 클라이언트 > SW 메시지 타입
export type ClientToServiceWorkerAction =
  | { type: "INIT_INSTALL_CHECK" }
  | { type: "SYNC_NETWORK_STATE"; data: boolean };
// SW > 클라이언트 메시지 타입
export type ServiceWorkerToClientAction =
  | {
      type: "INSTALL_START";
    }
  | { type: "INSTALL_END" };
// 클라이언트 > SW 요청에 대한 응답 메세지 타입
export type ClientToServiceWorkerResponseAction = {
  type: "INIT_INSTALL_CHECK_RESPONSE";
};
