import { useCallback, useRef, useState } from "react";
import { Position } from "../App";
import { GAME_AREA_POSITIONS } from "./GameArea";

export const useGameAnimation = (
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
) => {
  const animationRef = useRef<number | undefined>(undefined);
  const latestTimeStamp = useRef<number | undefined>(undefined);
  var [dartPosition, setDartPosition] = useState<Position>({
    x: GAME_AREA_POSITIONS.hunterX,
    y: GAME_AREA_POSITIONS.hunterY,
  });

  const gravity = 9.8; // m/s

  const drawDart = (context: CanvasRenderingContext2D, dp: Position) => {
    context.save();
    context.translate(dp.x, dp.y);
    context.fillStyle = "#e6e6e6";
    context.beginPath();
    context.ellipse(0, 0, 5, 5, 0, 0, 2 * Math.PI);
    context.fill();
    context.restore();
  };

  const animate = (timeStamp: number, position: Position) => {
    const timeDelta = timeStamp - (latestTimeStamp.current || timeStamp); // ms

    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas!.getContext("2d")!;
      drawDart(context, position);
    }

    setDartPosition((prev) => {
      console.log("Setting position");
      const next = {
        x: prev.x + 0.1 * timeDelta,
        y: prev.y - (gravity / 1000) * timeDelta,
      };
      return next;
    });
    console.log(position);

    latestTimeStamp.current = timeStamp;
    animationRef.current = window.requestAnimationFrame((ts) =>
      animate(ts, {
        x: position.x + 0.1 * timeDelta,
        y: position.y - (gravity / 1000) * timeDelta,
      })
    );
  };

  const startAnimation = () => {
    if (!animationRef.current) {
      console.log("Starting animation!");
      animationRef.current = window.requestAnimationFrame((ts) =>
        animate(ts, dartPosition)
      );
    }
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      console.log("Stopping animation");
      window.cancelAnimationFrame(animationRef.current);
      animationRef.current = undefined;
      latestTimeStamp.current = undefined;
    }
  };

  return {
    startAnimation,
    stopAnimation,
  };
};
