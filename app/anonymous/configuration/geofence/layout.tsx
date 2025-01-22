"use client";

import { createContext, useEffect, useState } from "react";

export const GeoContext = createContext<{
  grpId?: number;
  setGrpId?: (grpId?: number) => void;
}>({
  grpId: undefined,
  setGrpId: undefined,
});

const Provider = GeoContext.Provider;

const GeofenceLayout = ({ children }) => {
  const [grpId, setGrpId] = useState<number>(null);

  return <Provider value={{ grpId, setGrpId }}>{children}</Provider>;
};

export default GeofenceLayout;
