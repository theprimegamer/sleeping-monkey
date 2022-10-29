import React, { useEffect } from "react";
import { GAME_AREA_POSITIONS } from "./GameArea";

export const useGameCanvas = (
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  launchAngle: number
) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas!.getContext("2d")!;
    context.save();

    const drawTargetting = (context: CanvasRenderingContext2D) => {
      context.save();
      context.translate(
        GAME_AREA_POSITIONS.hunterX,
        GAME_AREA_POSITIONS.hunterY
      );
      context.rotate(-(launchAngle * Math.PI) / 180);
      context.beginPath();
      context.setLineDash([20, 15]);
      context.moveTo(0, 0);
      context.lineTo(900, 0);
      context.stroke();
      context.restore();
    };

    const drawHunter = (context: CanvasRenderingContext2D) => {
      context.save();
      context.fillStyle = "#FFE9A7";
      context.fillRect(50, GAME_AREA_POSITIONS.hunterY, 50, 100);
      context.strokeRect(50, GAME_AREA_POSITIONS.hunterY, 50, 100);
      context.restore();
    };

    const drawGround = (context: CanvasRenderingContext2D) => {
      context.save();
      context.fillStyle = "#AAF255";
      context.fillRect(
        0,
        GAME_AREA_POSITIONS.height - 10,
        GAME_AREA_POSITIONS.width,
        10
      );
      context.restore();
    };

    const drawTree = (context: CanvasRenderingContext2D) => {
      context.save();
      context.fillStyle = "#C68600";
      context.fillRect(700, 100, 50, GAME_AREA_POSITIONS.height);
      context.restore();
    };

    drawTree(context);
    drawHunter(context);
    drawGround(context);
    drawTargetting(context);

    return () => {
      context.restore();
      context.clearRect(
        0,
        0,
        GAME_AREA_POSITIONS.width,
        GAME_AREA_POSITIONS.height
      );
    };
  }, [launchAngle]);
};