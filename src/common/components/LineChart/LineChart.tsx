import React from "react";
import dynamic from "next/dynamic";
import { DateTime } from "luxon";
import clsx from "clsx";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
interface LineChartProps {
  dark: boolean;
  isLoading: boolean;
  seriesOption: string;
  data: { x: string; y: number }[];
  setData: React.Dispatch<React.SetStateAction<string>>;
}
export default function LineChart({
  dark,
  isLoading,
  seriesOption,
  data,
  setData,
}: LineChartProps) {
  const options: { options: ApexOptions; loadingOptions: ApexOptions } = {
    options: {
      theme: {
        mode: "dark",
        palette: "palette1",
        monochrome: {
          enabled: false,
          color: "#255aee",
          shadeTo: "light",
          shadeIntensity: 0.65,
        },
      },
      chart: {
        background: "transparent",
        zoom: {
          enabled: false,
        },

        toolbar: {
          show: false,
        },

        fontFamily: "font-family: Inter",
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: "20px",
          fontWeight: "bold",
          fontFamily: "font-family: Inter",
        },
      },
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        width: 3,
        dashArray: 0,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        offsetY: -20,
        fontSize: "14px",
        fontWeight: 600,
        labels: {
          colors: dark ? "#f3f4f6" : "#111827",
        },
      },
      grid: {
        show: false,
        strokeDashArray: 3,
        borderColor: dark ? "#18181b" : "#e5e7eb",
      },
      yaxis: {
        labels: {
          show: false,
          style: {
            colors: dark ? "#71717a" : "#9ca3af",
            fontSize: "12px",
            fontFamily: "font-family: Inter",
            fontWeight: 600,
          },
        },
      },
      tooltip: {
        marker: {
          show: true,
        },
      },
      xaxis: {
        crosshairs: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
        type: "category",
        axisTicks: {
          show: false,
        },
        tickAmount: 5,
        axisBorder: {
          show: true,
          offsetY: 6,
          color: "#18181b",
        },
        labels: {
          formatter: function (value) {
            return DateTime.fromISO(value).toFormat("LLL d");
          },
          style: {
            colors: dark ? "#71717a" : "#9ca3af",
            fontSize: "12px",
            fontFamily: "font-family: Inter",
            fontWeight: 600,
          },
        },
      },
    },
    loadingOptions: {
      colors: ["#27272a"],
      fill: {
        type: "solid",
        colors: ["#18181b"],
      },
      chart: {
        sparkline: {
          enabled: true,
        },
        background: "transparent",
        animations: {
          enabled: false,
        },
      },
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        width: 1,
        dashArray: 0,
      },
      tooltip: {
        enabled: false,
        marker: {
          show: false,
        },
      },
    },
  };

  const dataOptions = ["1w", "1m"];

  return isLoading ? (
    <div className="relative overflow-hidden rounded-2xl border  dark:border-zinc-900  border-gray-100 dark:bg-black space-y-3 opacity-70">
      <div className="space-y-3 p-5">
        <p className="h-4 bg-zinc-900 sm:w-60 w-1/2 rounded-full"></p>
        <p className="h-3 bg-zinc-900 sm:w-96 w-1/4 rounded-full"></p>
      </div>
      <div className="before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-rose-100/10 before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent">
        <div className=" ">
          <Chart
            options={options.loadingOptions}
            series={[
              {
                name: "Requests",
                data: [1.5, 3, 2, 3],
              },
            ]}
            type="area"
            height={450}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="rounded-2xl  p-5 border  dark:border-zinc-900  border-gray-100 dark:bg-black space-y-3">
      <div className="flex justify-between items-start">
        <span>
          <h1 className="font-medium text-zinc-100 text-xl">Requests</h1>
          <p className="text-zinc-400">
            {seriesOption === "1w" ? "Over last 7 days" : "Over last 30 days"}
          </p>
        </span>
        <div className="text-zinc-100 flex space-x-3 text-sm">
          {dataOptions.map((option, index) => (
            <button
              key={index}
              className={clsx(
                "uppercase transition-colors duration-300 ",
                seriesOption === option
                  ? "text-blue-500"
                  : "text-zinc-500 hover:text-zinc-100"
              )}
              onClick={() => setData(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <Chart
        options={options.options}
        series={[
          {
            name: "Requests",
            data: data,
          },
        ]}
        type="line"
        height={450}
      />
    </div>
  );
}
