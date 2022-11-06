import React, { useEffect } from "react";
import { Position } from "../App";
import { GAME_AREA_POSITIONS } from "./GameArea";

export const useGameCanvas = (
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>,
  launchAngle: number,
  dartPosition: Position,
  monkeyPosition: Position,
  showDart: boolean
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
      context.fillRect(
        GAME_AREA_POSITIONS.hunterX,
        GAME_AREA_POSITIONS.hunterY,
        -50,
        100
      );
      context.strokeRect(
        GAME_AREA_POSITIONS.hunterX,
        GAME_AREA_POSITIONS.hunterY,
        -50,
        100
      );
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
      context.fillRect(700, 180, 50, GAME_AREA_POSITIONS.height);
      context.restore();
    };

    const drawTreeLeaves = (context: CanvasRenderingContext2D) => {
      context.save();
      context.fillStyle = "#33691e";
      context.fillRect(640, 140, 160, 60);
      context.restore();
    };

    const drawMonkey = (context: CanvasRenderingContext2D) => {
      context.save();
      context.translate(
        GAME_AREA_POSITIONS.hunterX + monkeyPosition.x,
        GAME_AREA_POSITIONS.hunterY - monkeyPosition.y
      );
      context.fillStyle = "#3e2723";
      // context.fillRect(675, 50, 50, 100);
      context.fillRect(0, 0, -50, 100);
      context.restore();
    };

    const drawDart = (context: CanvasRenderingContext2D) => {
      context.save();
      context.translate(
        GAME_AREA_POSITIONS.hunterX + dartPosition.x,
        GAME_AREA_POSITIONS.hunterY - dartPosition.y
      );
      context.fillStyle = "#959595";
      context.beginPath();
      context.ellipse(0, 0, 5, 5, 0, 0, 2 * Math.PI);
      context.fill();
      context.restore();
    };

    drawTree(context);
    drawTreeLeaves(context);
    drawMonkey(context);
    drawHunter(context);
    drawGround(context);
    if (showDart) {
      drawDart(context);
    }
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
  }, [launchAngle, dartPosition]);
};
