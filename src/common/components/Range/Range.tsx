import clsx from "clsx";
import { NextComponentType, NextPageContext } from "next";
const labels = {
  percent: 37,
  degree: 186,
};
interface RangeProps {
  children: React.ReactNode;
  value: number;
  set: (newValue: number) => void;
  min?: number;
  max?: number;
  step?: number;
  showValues: boolean;
  label?: "degree" | "percent";
}
const Range: NextComponentType<NextPageContext, {}, RangeProps> = ({
  value,
  children,
  set,
  min = -1,
  max = 1,
  showValues = true,
  label,
  step = 1,
}) => (
  <div>
    <label htmlFor="customRange1" className=" font-medium">
      {children}
    </label>
    <input
      className="appearance-none w-full h-[1px] p-0 focus:outline-none focus:ring-0 focus:shadow-none bg-blue-500 rounded-full slider"
      value={value}
      type="range"
      min={min}
      max={max}
      step={step}
      onChange={(e) => set(parseFloat(e.target.value))}
    />
    {showValues && (
      <div className={clsx(min < 0 && "mr-1", "flex justify-between text-zinc-300 text-xs mt-1")}>
        <p>
          {min}
          {label && String.fromCharCode(labels[label])}
        </p>
        <p>
          {value}
          {label && String.fromCharCode(labels[label])}
        </p>
        <p>
          {max}
          {label && String.fromCharCode(labels[label])}
        </p>
      </div>
    )}
  </div>
);
export default Range;
