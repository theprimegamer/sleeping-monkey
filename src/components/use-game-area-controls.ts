import { Dispatch, SetStateAction } from "react";
import { Position } from "../App";
import { INITIAL_DART_POSITION } from "./GameArea";
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

    const y = Math.sin((launchAngle * Math.PI) / 180) * velocity;
    const x = Math.cos((launchAngle * Math.PI) / 180) * velocity;
    setDartVelocity({
      x,
      y,
    });
  };

  const handlePause = () => {
    setDartState(DartAnimationState.Paused);
  };

  const handleReset = () => {
    setDartState(DartAnimationState.Idle);
    setDartPosition(INITIAL_DART_POSITION);
  };

  return {
    handleLaunch,
    handlePause,
    handleReset,
  };
};
