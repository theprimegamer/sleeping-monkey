import { Dispatch, SetStateAction } from "react";
import { Position } from "../App";
import { GAME_AREA_CONVERSIONS, GAME_AREA_POSITIONS } from "./GameArea";
import { DartAnimationState } from "./use-game-animation";

export const useGameAreaControls = (
  launchAngle: number,
  velocity: number,
  setDartState: Dispatch<SetStateAction<DartAnimationState>>,
  setDartPosition: Dispatch<SetStateAction<Position>>,
  setDartVelocity: Dispatch<SetStateAction<Position>>
) => {
  const handleLaunch = () => {
    setDartState(DartAnimationState.DartLaunched);

    const y =
      Math.sin((launchAngle * Math.PI) / 180) *
      velocity *
      GAME_AREA_CONVERSIONS.realToGameY;
    const x =
      Math.cos((launchAngle * Math.PI) / 180) *
      velocity *
      GAME_AREA_CONVERSIONS.realToGameX;
    setDartVelocity({
      x,
      y,
    });
  };

  const handlePause = () => {
    setDartState(DartAnimationState.Paused);
  };

  const handleContinue = () => {
    setDartState(DartAnimationState.DartLaunched);
  };

  const handleReset = () => {
    setDartState(DartAnimationState.Idle);
    setDartPosition({ x: 0, y: 0 });
  };

  return {
    handleLaunch,
    handlePause,
    handleContinue,
    handleReset,
  };
};
