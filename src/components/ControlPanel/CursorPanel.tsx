import React from "react";
import { Position } from "../../App";

type CursorPanelProps = {
  position: Position;
  containerClass?: string;
};

export const CursorPanel: React.FC<CursorPanelProps> = ({
  position,
  containerClass = "",
}) => {
  return (
    <div className={"h-full p-4 " + containerClass}>
      <div className="text-xl mb-3">
        <label>Cursor Position (meters)</label>
      </div>
      <div className="grid grid-cols-2">
        <div>X: {position.x}</div>
        <div>Y: {position.y}</div>
      </div>
    </div>
  );
};
