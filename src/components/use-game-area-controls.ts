import { Dispatch, SetStateAction } from "react";
import { Position } from "../App";
import { GAME_AREA_CONVERSIONS, GAME_AREA_POSITIONS } from "./GameArea";
import { DartAnimationState, MonkeyAnimationState } from "./use-game-animation";

export const useGameAreaControls = (
  launchAngle: number,
  velocity: number,
  setDartState: Dispatch<SetStateAction<DartAnimationState>>,
  setDartPosition: Dispatch<SetStateAction<Position>>,
  setDartVelocity: Dispatch<SetStateAction<Position>>,
  setMonkeyState: Dispatch<SetStateAction<MonkeyAnimationState>>,
  setMonkeyPosition: Dispatch<SetStateAction<Position>>,
  setMonkeyVelocity: Dispatch<SetStateAction<Position>>
) => {
  const handleLaunch = () => {
    setDartState(DartAnimationState.DartLaunched);
    setMonkeyState(MonkeyAnimationState.Falling);

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
    setMonkeyState(MonkeyAnimationState.Paused);
  };

  const handleContinue = () => {
    setDartState(DartAnimationState.DartLaunched);
    setMonkeyState(MonkeyAnimationState.Falling);
  };

  const handleReset = () => {
    setDartState(DartAnimationState.Idle);
    setDartPosition({ x: 0, y: 0 });
    setDartVelocity({ x: 0, y: 0 });
    setMonkeyState(MonkeyAnimationState.Idle);
    setMonkeyPosition({
      x: GAME_AREA_POSITIONS.monkeyX,
      y: GAME_AREA_POSITIONS.monkeyY,
    });
    setMonkeyVelocity({
      x: 0,
      y: 0,
    });
  };

  return {
    handleLaunch,
    handlePause,
    handleContinue,
    handleReset,
  };
};
