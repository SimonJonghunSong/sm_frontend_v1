import {
  handleGlobalLoadingOff,
  handleGlobalLoadingOn,
} from "@/src/stores/useGlobalLoading";

// 수신용
const swToClientBroadcast = new BroadcastChannel("sw-to-client");
// 발신용
const clientToSwBroadcast = new BroadcastChannel("client-to-sw");

export interface BoradcaseMessage {
  type: string;
  data?: any;
}

export default function useServiceWorkerMessage() {
  const sendMessage = (message: BoradcaseMessage) => {
    clientToSwBroadcast.postMessage(message);
  };

  return { swToClientBroadcast, clientToSwBroadcast, sendMessage };
}
