import {
  HomeIcon,
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/solid";
const numeral = require("numeral");
interface CardProps {
  count: number;
  isLoading: boolean;
  isError: boolean;
  title: string;
  change: number;
  type: string;
}
export default function Card({
  count,
  isLoading,
  isError,
  title,
  change,
  type,
}: CardProps) {
  function Value() {
    if (isLoading) return <span className=" animate-pulse">1,234</span>;
    if (isError) return <span className=" text-red-600 ">err</span>;
    return type === "count"
      ? numeral(count).format("0,0")
      : numeral(count).format("00:00:00");
  }

  return (
    <div className="rounded-2xl   p-6  shadow-gray-100   flex justify-between items-center shadow-lg border-gray-100   border">
      <div className="space-y-3 flex flex-col">
        <span className="space-y-3">
          <h1 className=" font-semibold text-left text  ">
            {title}
          </h1>
          <div className="flex space-x-2 items-center">
            {change < 0 ? (
              <ArrowTrendingDownIcon className="  h-6 w-6 bg-red-100   text-red-500  rounded-full p-1" />
            ) : (
              <ArrowTrendingUpIcon className="  h-6 w-6 bg-green-100    text-green-500 rounded-full p-1" />
            )}
            <span className=" font-semibold text-sm  ">
              {(change > 0 ? "+" : "") + change.toFixed(1)}%
            </span>
          </div>
        </span>

        <h1 className="text-left text-4xl  font-bold ">
          <Value />
        </h1>
      </div>
    </div>
  );
}
