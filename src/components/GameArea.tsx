import React, { useEffect, useRef, useState } from "react";
import { Position } from "../App";
import { useGameAreaControls } from "./use-game-area-controls";
import { DartAnimationState, useGameAnimation } from "./use-game-animation";
import { useGameCanvas } from "./use-game-canvas";
import { useGameMouseEvents } from "./use-game-mouse-events";

export const GAME_AREA_POSITIONS = {
  width: 800,
  height: 600,
  hunterX: 100,
  hunterY: 500,
  realWidth: 10,
  realHeight: 5,
};

export const INITIAL_DART_POSITION = {
  x: GAME_AREA_POSITIONS.hunterX,
  y: GAME_AREA_POSITIONS.hunterY,
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
  const [dartPosition, setDartPosition] = useState<Position>(
    INITIAL_DART_POSITION
  );
  const [dartVelocity, setDartVelocity] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [dartState, setDartState] = useState(DartAnimationState.Idle);

  useGameCanvas(
    canvasRef,
    launchAngle,
    dartPosition,
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
    setDartVelocity
  );
  const { handleLaunch, handlePause, handleReset } = useGameAreaControls(
    launchAngle,
    velocity,
    setDartState,
    setDartPosition,
    setDartVelocity
  );

  return (
    <>
      <div className="flex justify-center gap-4">
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
          <button className="btn btn-blue" onClick={handleLaunch}>
            Contine
          </button>
        )}
      </div>
      <div className="flex justify-center">
        <div
          className="relative"
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
      <div>{JSON.stringify(dartPosition)}</div>
      <div>{JSON.stringify(dartVelocity)}</div>
    </>
  );
};
