import React, { createContext } from "react";

type AppContextType = {
  launchAngleDeg: number;
  cursorPositionXMeters: number;
  cursorPositionYMeters: number;
  velocityMetersPerSec: number;
};

export const DEFAULT_APP_CONTEXT: AppContextType = {
  cursorPositionXMeters: 0,
  cursorPositionYMeters: 0,
  launchAngleDeg: 15,
  velocityMetersPerSec: 10,
};

export const AppContext = createContext<AppContextType>(DEFAULT_APP_CONTEXT);
