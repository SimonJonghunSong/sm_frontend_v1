import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = string;

interface authState {
  userId: string;
  setUserId: (newUserId: string) => void;
  userRole: UserRole;
  setUserRole: (newUserRole: UserRole) => void;
  token: string;
  setToken: (newUserId: string) => void;
  refreshToken: string;
  setRefreshToken: (newUserId: string) => void;
  targetCountry: string;
  setTargetCountry: (newTargetCountry: string) => void;
  logout: () => void;
}

const useAuthStore = create(
  persist<authState>(
    (set) => ({
      userId: null,
      setUserId: (newUserId) => set({ userId: newUserId }),
      userRole: null,
      setUserRole: (newUserRole) => set({ userRole: newUserRole }),
      token: null,
      setToken: (token) => set({ token }),
      refreshToken: null,
      setRefreshToken: (refreshToken) => set({ refreshToken }),
      targetCountry: null,
      setTargetCountry: (targetCountry) => set({ targetCountry }),
      logout: () => set({ 
        userId: null, 
        userRole: null, 
        token: null, 
        refreshToken: null, 
        targetCountry: null 
      }),
    }),
    {
      name: "syncMasterAuthStore",
    }
  )
);

export default useAuthStore;
