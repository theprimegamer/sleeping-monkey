import { useState } from "react";
import { CursorPanel } from "./components/ControlPanel/CursorPanel";
import { GameArea } from "./components/GameArea";
import { NumberController } from "./components/ControlPanel/NumberController";

export type Position = {
  x: number;
  y: number;
};

function App() {
  // m
  const [cursorPosition, setCursorPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  // m/s
  const [velocity, setVelocity] = useState(10);
  // deg
  const [launchAngle, setLaunchAngle] = useState(15);

  return (
    <div className="border border-black p-4">
      <div className="control-panel flex gap-4 w-full">
        <CursorPanel
          position={cursorPosition}
          containerClass="flex-grow"
        ></CursorPanel>
        <NumberController
          label="Launch Angle (degrees)"
          max={90}
          min={0}
          setValue={setLaunchAngle}
          value={launchAngle}
          tickInterval={15}
          containerClass="flex-grow"
        ></NumberController>
        <NumberController
          label="Velocity (m/s)"
          max={25}
          min={5}
          setValue={setVelocity}
          value={velocity}
          tickInterval={5}
          containerClass="flex-grow"
        ></NumberController>
      </div>
      <div className="flex justify-center">
        <GameArea
          launchAngle={launchAngle}
          velocity={velocity}
          setPosition={setCursorPosition}
          setLaunchAngle={setLaunchAngle}
        ></GameArea>
      </div>
    </div>
  );
}

export default App;
