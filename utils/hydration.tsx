"use client";

import * as React from "react";
import useAuthStore from "./useAuthStore";

const Hydration = () => {
  // React.useEffect(() => {
  //   if (!navigator.serviceWorker.controller) {
  //     window.location.reload();
  //   }
  // }, []);
  React.useEffect(() => {
    useAuthStore.persist.rehydrate();
  }, []); // (b)

  return null;
};

export default Hydration;
