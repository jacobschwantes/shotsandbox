import { NextComponentType, NextPageContext } from "next";
interface RangeProps {
  children: React.ReactNode;
  value: number;
  set: (newValue: number) => void;
  min?: number;
  max?: number;
}
const Range: NextComponentType<NextPageContext, {}, RangeProps> = ({
  value,
  children,
  set,
  min = -1,
  max = 1,
}) => (
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
  </div>
);
export default Range
