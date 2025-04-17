import { create } from "zustand";
import { persist } from "zustand/middleware";

// 탭 상태 인터페이스
interface DeviceConfigurationTabState {
  tab: string;
}

// 탭 액션 인터페이스
interface DeviceConfigurationTabAction {
  setTab: (tab: string) => void;
  getTab: () => string;
}

// Zustand 스토어 생성
const useDeviceConfigurationTabStore = create<
  DeviceConfigurationTabState & DeviceConfigurationTabAction
>()(
  persist(
    (set, get) => ({
      // 초기 상태
      tab: "",

      // 액션
      setTab: (tab: string) => set({ tab }),
      getTab: () => get().tab,
    }),
    {
      name: "device-configuration-tab-storage", // 로컬 스토리지에 저장될 키 이름
    }
  )
);

export default useDeviceConfigurationTabStore;
