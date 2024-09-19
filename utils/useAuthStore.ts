import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "ROOT" | "ADMIN" | "CUSTOMER" | "GUEST";

interface authState {
  userId: string;
  setUserId: (newUserId: string) => void;
  userRole: UserRole;
  setUserRole: (newUserRole: UserRole) => void;
}

const useAuthStore = create(
  persist<authState>(
    (set) => ({
      userId: null,
      setUserId: (newUserId) => set({ userId: newUserId }),
      userRole: null,
      setUserRole: (newUserRole) => set({ userRole: newUserRole }),
    }),
    {
      name: "syncMasterAuthStore",
    }
  )
);

export default useAuthStore;
