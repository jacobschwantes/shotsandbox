import React from "react";
import dynamic from "next/dynamic";
import { DateTime } from "luxon";
import clsx from "clsx";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function LineChart(props) {
  const options = {
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

        fontFamily: 'font-family: Inter',
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: "20px",
          fontWeight: "bold",
          fontFamily: 'font-family: Inter',
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
          colors: props.dark ? "#f3f4f6" : "#111827",
        },
      },

      grid: {
        show: false,
        strokeDashArray: 3,
        borderColor: props.dark ? "#18181b" : "#e5e7eb",
      },
      yaxis: {
        labels: {
          show: false,
          style: {
            colors: props.dark ? "#71717a" : "#9ca3af",
            fontSize: "12px",
            fontFamily: 'font-family: Inter',
            fontWeight: 600,
          },
        },
      },
      tooltip :{
        marker: {
          show: true
        }
      },
      xaxis: {

        crosshairs: {
          show: false
        },
        tooltip: {
          enabled: false
        },
        type: "category",
        axisTicks: {
          show: false,
        },
        tickAmount: 5,
        axisBorder: {
          show: true,
          offsetY: 6,
          color: "#18181b"
        },
        labels: {

           formatter: function (value) {
            
            return DateTime.fromISO(value).toFormat('LLL d');
          },
          style: {
            colors: props.dark ? "#71717a" : "#9ca3af",
            fontSize: "12px",
            fontFamily: 'font-family: Inter',
            fontWeight: 600,
          },
        },
      },
    },
  };
  const dataOptions = ['1w', '1m']

  return (
    <div className="rounded-2xl  p-5 border  dark:border-zinc-900  border-gray-100 dark:bg-black space-y-3">
      <div className="flex justify-between items-start">
        <span>
          <h1 className="font-medium text-zinc-100 text-xl">Requests</h1>
          <p className="text-zinc-400">{props.seriesOption === "1w" ? "Over last 7 days" : "Over last 30 days"}</p>
        </span>
        <div className="text-zinc-100 flex space-x-3 text-sm">
          {dataOptions.map((option) => (
            <button className={clsx("uppercase transition-colors duration-300 ", props.seriesOption === option ? "text-blue-500" : "text-zinc-500 hover:text-zinc-100")} onClick={() => props.setData(option)}>{option}</button>
          ))}
        </div>
      </div>
      <Chart
        options={options.options}
        series={[
          {
            name: "Requests",
            data: props.data,
          },
        ]}
        type="line"
        height={450}
      />
    </div>
  );
}
