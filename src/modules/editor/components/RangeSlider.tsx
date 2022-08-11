import { ReactNode } from "react";

interface InputProps {
  children: ReactNode;
  value: number;
  set: (newValue: number) => void;
  min?: number;
  max?: number;
}

export function RangeSlider({
  value,
  children,
  set,
  min = -1,
  max = 1,
}: InputProps) {
  return (
    <div>
      <label htmlFor="customRange1" className=" font-medium">
        {children}
      </label>
      

      <input
        className="appearance-none w-full h-1 p-0 focus:outline-none focus:ring-0 focus:shadow-none bg-blue-500 rounded-full slider"
        value={value}
        type="range"
        min={min}
        max={max}
        step={0.01}
        onChange={(e) => set(parseFloat(e.target.value))}
      />
      {/* <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => set(parseFloat(e.target.value) || 0)}
        /> */}
    </div>
  );
}
