import React, { MouseEventHandler, useEffect, useRef } from "react";
import { Position } from "../App";
import { clamp } from "../utility/number-utility";
import { useGameAnimation } from "./use-game-animation";
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

  useGameCanvas(canvasRef, launchAngle);
  const { handleMouseClick, handleMouseMove } = useGameMouseEvents(
    mouseTargetRef,
    setPosition,
    setLaunchAngle
  );
  const { startAnimation, stopAnimation } = useGameAnimation(canvasRef);

  return (
    <div
      className="relative"
      style={{
        height: GAME_AREA_POSITIONS.height,
        width: GAME_AREA_POSITIONS.width,
      }}
      onClick={() => {
        startAnimation();
        setTimeout(() => {
          stopAnimation();
        }, 4000);
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
  );
};
