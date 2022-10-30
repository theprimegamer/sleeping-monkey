import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Position } from "../App";

export enum DartAnimationState {
  Idle,
  DartLaunched,
  Paused,
}

export enum MonkeyAnimationState {
  Idle,
  Falling,
  Running,
}

export const useGameAnimation = (
  dartState: DartAnimationState,
  dartPosition: Position,
  dartVelocity: Position,
  setDartPosition: Dispatch<SetStateAction<Position>>,
  setDartVelocity: Dispatch<SetStateAction<Position>>
) => {
  const animationRef = useRef<number | undefined>(undefined);
  const latestTimeStamp = useRef<number | undefined>(undefined);

  const gravity = 9.8; // m/s

  const animate = (
    timeStamp: number,
    tDartPosition?: Position,
    tDartVelocity?: Position
  ) => {
    const timeDelta = timeStamp - (latestTimeStamp.current || timeStamp); // ms
    console.warn(timeDelta);
    if (tDartPosition === undefined) {
      tDartPosition = dartPosition;
    }
    if (tDartVelocity === undefined) {
      tDartVelocity = dartVelocity;
    }

    if (dartState === DartAnimationState.DartLaunched) {
      const nextPosition: Position = {
        x: tDartPosition.x + tDartVelocity.x,
        y: tDartPosition.y - tDartVelocity.y,
      };

      const nextVelocity: Position = {
        x: tDartVelocity.x,
        y: tDartVelocity.y - gravity * 0.01,
      };
      console.log(nextPosition);
      setDartPosition(nextPosition);
      setDartVelocity(nextVelocity);
      tDartPosition = nextPosition;
      tDartVelocity = nextVelocity;
    }

    latestTimeStamp.current = timeStamp;
    animationRef.current = window.requestAnimationFrame((ts) =>
      animate(ts, tDartPosition, tDartVelocity)
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
