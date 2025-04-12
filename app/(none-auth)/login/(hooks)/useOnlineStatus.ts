import { useState, useEffect } from "react";

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setIsOnline(navigator.onLine);

      const handleOnlineStatusChange = () => {
        setIsOnline(navigator.onLine);
      };

      window.addEventListener("online", handleOnlineStatusChange);
      window.addEventListener("offline", handleOnlineStatusChange);

      return () => {
        window.removeEventListener("online", handleOnlineStatusChange);
        window.removeEventListener("offline", handleOnlineStatusChange);
      };
    }
  }, []);

  return isOnline;
}
