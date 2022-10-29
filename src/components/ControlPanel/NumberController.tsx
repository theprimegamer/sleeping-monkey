import React, {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
} from "react";
import { clamp } from "../../utility/number-utility";

type NumberControllerProps = {
  label: string;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  min: number;
  max: number;
  tickInterval: number;
  containerClass?: string;
};

export const NumberController: React.FC<NumberControllerProps> = ({
  value,
  setValue,
  label,
  min,
  max,
  tickInterval,
  containerClass = "",
}) => {
  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(+e.target.value);
  };

  const handleButtonClick = (addition: number) => {
    setValue((value) => clamp(value + addition, min, max));
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (isNaN(+e.target.value)) {
      return;
    }

    const newValue = clamp(+e.target.value, min, max);
    setValue(newValue);
  };

  const ticks: number[] = [];
  for (let i = min; i <= max; i += tickInterval) {
    ticks.push(i);
  }

  return (
    <div className={"h-full p-4 " + containerClass}>
      <div className="flex justify-between items-center text-xl mb-3">
        <label>{label}</label>

        <input
          type="text"
          className="input w-20 text-center"
          value={value}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex justify-center gap-12 mb-3">
        <button className="btn btn-blue" onClick={() => handleButtonClick(-1)}>
          -
        </button>
        <button className="btn btn-blue" onClick={() => handleButtonClick(1)}>
          +
        </button>
      </div>
      <div className="w-full flex justify-between">
        {ticks.map((x) => (
          <div key={x}>{x}</div>
        ))}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        className="w-full"
        onChange={handleSliderChange}
      />
    </div>
  );
};
