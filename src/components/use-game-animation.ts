import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Position } from "../App";
import { GAME_AREA_CONVERSIONS } from "./GameArea";

export enum DartAnimationState {
  Idle,
  DartLaunched,
  Paused,
}

export enum MonkeyAnimationState {
  Idle,
  Falling,
  Running,
  Paused,
}

export const useGameAnimation = (
  dartState: DartAnimationState,
  dartPosition: Position,
  dartVelocity: Position,
  setDartPosition: Dispatch<SetStateAction<Position>>,
  setDartVelocity: Dispatch<SetStateAction<Position>>,
  monkeyState: MonkeyAnimationState,
  monkeyPosition: Position,
  monkeyVelocity: Position,
  setMonkeyPosition: Dispatch<SetStateAction<Position>>,
  setMonkeyVelocity: Dispatch<SetStateAction<Position>>
) => {
  const animationRef = useRef<number | undefined>(undefined);
  const latestTimeStamp = useRef<number | undefined>(undefined);

  const gravity = 9.8; // m/s

  const animate = (
    timeStamp: number,
    tDartPosition?: Position,
    tDartVelocity?: Position,
    tMonkeyPosition?: Position,
    tMonkeyVelocity?: Position
  ) => {
    const timeDelta = timeStamp - (latestTimeStamp.current || timeStamp); // ms
    if (tDartPosition === undefined) {
      tDartPosition = dartPosition;
    }
    if (tDartVelocity === undefined) {
      tDartVelocity = dartVelocity;
    }
    if (tMonkeyPosition === undefined) {
      tMonkeyPosition = monkeyPosition;
    }
    if (tMonkeyVelocity === undefined) {
      tMonkeyVelocity = monkeyVelocity;
    }

    if (dartState === DartAnimationState.DartLaunched) {
      const nextPosition: Position = {
        x: tDartPosition.x + (tDartVelocity.x * timeDelta) / 1000,
        y: tDartPosition.y + (tDartVelocity.y * timeDelta) / 1000,
      };

      const nextVelocity: Position = {
        x: tDartVelocity.x,
        y:
          tDartVelocity.y -
          (gravity * GAME_AREA_CONVERSIONS.realToGameY * timeDelta) / 1000,
      };
      setDartPosition(nextPosition);
      setDartVelocity(nextVelocity);
      tDartPosition = nextPosition;
      tDartVelocity = nextVelocity;
    }

    if (monkeyState === MonkeyAnimationState.Falling) {
      const nextPosition: Position = {
        x: tMonkeyPosition.x + (tMonkeyVelocity.x * timeDelta) / 1000,
        y: tMonkeyPosition.y + (tMonkeyVelocity.y * timeDelta) / 1000,
      };
      const nextVelocity: Position = {
        x: tMonkeyVelocity.x,
        y:
          tMonkeyVelocity.y -
          (gravity * GAME_AREA_CONVERSIONS.realToGameY * timeDelta) / 1000,
      };

      setMonkeyPosition(nextPosition);
      setMonkeyVelocity(nextVelocity);
      tMonkeyPosition = nextPosition;
      tMonkeyVelocity = nextVelocity;
    }

    latestTimeStamp.current = timeStamp;
    animationRef.current = window.requestAnimationFrame((ts) =>
      animate(
        ts,
        tDartPosition,
        tDartVelocity,
        tMonkeyPosition,
        tMonkeyVelocity
      )
    );
  };

  const startAnimation = () => {
    if (!animationRef.current) {
      animationRef.current = window.requestAnimationFrame((ts) => animate(ts));
    }
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      window.cancelAnimationFrame(animationRef.current);
      animationRef.current = undefined;
      latestTimeStamp.current = undefined;
    }
  };

  useEffect(() => {
    if (
      dartState === DartAnimationState.DartLaunched &&
      !animationRef.current
    ) {
      startAnimation();
    }
    if (dartState !== DartAnimationState.DartLaunched && animationRef.current) {
      stopAnimation();
    }
  }, [dartState, animationRef.current]);
};
