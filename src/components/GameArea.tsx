import React, { useEffect, useRef, useState } from "react";
import { Position } from "../App";
import { useGameAreaControls } from "./use-game-area-controls";
import {
  DartAnimationState,
  MonkeyAnimationState,
  useGameAnimation,
} from "./use-game-animation";
import { useGameCanvas } from "./use-game-canvas";
import { useGameMouseEvents } from "./use-game-mouse-events";

export const GAME_AREA_POSITIONS = {
  width: 800,
  height: 600,
  hunterX: 100,
  hunterY: 500,
  monkeyX: 575, // relative to hunter as 0,0
  monkeyY: 450, // relative to hunter as 0,0
  realWidth: 10,
  realHeight: 10,
};

export const GAME_AREA_CONVERSIONS = {
  realToGameX:
    (GAME_AREA_POSITIONS.width - GAME_AREA_POSITIONS.hunterX) /
    GAME_AREA_POSITIONS.realWidth,
  realToGameY: GAME_AREA_POSITIONS.hunterY / GAME_AREA_POSITIONS.realHeight,
  gameToRealX:
    GAME_AREA_POSITIONS.realWidth /
    (GAME_AREA_POSITIONS.width - GAME_AREA_POSITIONS.hunterX),
  gameToRealY: GAME_AREA_POSITIONS.realHeight / GAME_AREA_POSITIONS.hunterY,
  msToSec: 1 / 1_000,
};

type GameAreaProps = {
  launchAngle: number;
  velocity: number;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
  setLaunchAngle: React.Dispatch<React.SetStateAction<number>>;
};

export const GameArea: React.FC<GameAreaProps> = ({
  launchAngle,
  velocity,
  setPosition,
  setLaunchAngle,
}) => {
  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const mouseTargetRef = useRef<null | HTMLDivElement>(null);
  const [dartPosition, setDartPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [dartVelocity, setDartVelocity] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [dartState, setDartState] = useState(DartAnimationState.Idle);
  const [monkeyPosition, setMonkeyPosition] = useState<Position>({
    x: GAME_AREA_POSITIONS.monkeyX,
    y: GAME_AREA_POSITIONS.monkeyY,
  });
  const [monkeyVelocity, setMonkeyVelocity] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [monkeyState, setMonkeyState] = useState(MonkeyAnimationState.Idle);

  useGameCanvas(
    canvasRef,
    launchAngle,
    dartPosition,
    monkeyPosition,
    dartState !== DartAnimationState.Idle
  );
  const { handleMouseClick, handleMouseMove } = useGameMouseEvents(
    mouseTargetRef,
    setPosition,
    setLaunchAngle
  );
  useGameAnimation(
    dartState,
    dartPosition,
    dartVelocity,
    setDartPosition,
    setDartVelocity,
    monkeyState,
    monkeyPosition,
    monkeyVelocity,
    setMonkeyPosition,
    setMonkeyVelocity
  );
  const { handleLaunch, handlePause, handleContinue, handleReset } =
    useGameAreaControls(
      launchAngle,
      velocity,
      setDartState,
      setDartPosition,
      setDartVelocity,
      setMonkeyState,
      setMonkeyPosition,
      setMonkeyVelocity
    );

  return (
    <>
      <div className="flex justify-center gap-4 mb-4">
        <button className="btn" onClick={handleReset}>
          Reset
        </button>
        {dartState === DartAnimationState.Idle && (
          <button className="btn btn-blue" onClick={handleLaunch}>
            Launch
          </button>
        )}
        {dartState === DartAnimationState.DartLaunched && (
          <button className="btn btn-blue" onClick={handlePause}>
            Pause
          </button>
        )}
        {dartState === DartAnimationState.Paused && (
          <button className="btn btn-blue" onClick={handleContinue}>
            Contine
          </button>
        )}
      </div>
      <div className="flex justify-center">
        <div
          className="relative border border-green-700 border-dashed"
          style={{
            height: GAME_AREA_POSITIONS.height,
            width: GAME_AREA_POSITIONS.width,
          }}
        >
          <div
            ref={mouseTargetRef}
            className="hover-area absolute cursor-crosshair"
            style={{
              left: GAME_AREA_POSITIONS.hunterX,
              bottom: GAME_AREA_POSITIONS.height - GAME_AREA_POSITIONS.hunterY,
              top: 0,
              right: 0,
            }}
            onClick={handleMouseClick}
            onMouseMove={handleMouseMove}
          ></div>
          <canvas
            ref={canvasRef}
            width={GAME_AREA_POSITIONS.width}
            height={GAME_AREA_POSITIONS.height}
          ></canvas>
        </div>
      </div>
      {JSON.stringify(dartPosition)}
      {JSON.stringify(dartVelocity)}
      <hr />
      {JSON.stringify(monkeyPosition)}
      {JSON.stringify(monkeyVelocity)}
    </>
  );
};
