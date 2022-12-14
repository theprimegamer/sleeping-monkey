import React, { MouseEventHandler, MutableRefObject } from "react";
import { Position } from "../App";
import { clamp } from "../utility/number-utility";
import { GAME_AREA_POSITIONS } from "./GameArea";

export const useGameMouseEvents = (
  mouseTargetRef: MutableRefObject<HTMLDivElement | null>,
  setCursorPosition: React.Dispatch<React.SetStateAction<Position>>,
  setLaunchAngle: React.Dispatch<React.SetStateAction<number>>
) => {
  const handleMouseClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = mouseTargetRef.current!;
    const offsetParent = target.offsetParent! as HTMLDivElement;
    const mouseX = e.pageX - offsetParent.offsetLeft - target.offsetLeft;
    const mouseY = e.pageY - offsetParent.offsetTop - target.offsetTop;

    const appAngle2 = Math.round(
      (Math.atan2(500 - mouseY, mouseX) * 180) / Math.PI
    );
    setLaunchAngle(clamp(appAngle2, 0, 90));
  };

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = mouseTargetRef.current!;
    const offsetParent = target.offsetParent! as HTMLDivElement;
    const mouseX = e.pageX - offsetParent.offsetLeft - target.offsetLeft;
    const mouseY = e.pageY - offsetParent.offsetTop - target.offsetTop;

    const appX = clamp(
      Math.round(
        (mouseX / (GAME_AREA_POSITIONS.width - GAME_AREA_POSITIONS.hunterX)) *
          GAME_AREA_POSITIONS.realWidth *
          10
      ) / 10,
      0,
      GAME_AREA_POSITIONS.realWidth
    );
    const appY = clamp(
      Math.round(
        (GAME_AREA_POSITIONS.realHeight -
          (mouseY / GAME_AREA_POSITIONS.hunterY) *
            GAME_AREA_POSITIONS.realHeight) *
          10
      ) / 10,
      0,
      GAME_AREA_POSITIONS.realHeight
    );

    setCursorPosition({
      x: appX,
      y: appY,
    });
  };

  return {
    handleMouseClick,
    handleMouseMove,
  };
};
