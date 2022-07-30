import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function LineChart(props) {
  const options = {
    chart: {
      foreColor: props.dark ? "#f3f4f6" : "#111827",
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: [],
        },

        autoSelected: "zoom",
      },
    },

    xaxis: {
      type: "category",
    },

    options: {
      theme: {
        mode: "light",
        palette: "palette1",
        monochrome: {
          enabled: false,
          color: "#255aee",
          shadeTo: "light",
          shadeIntensity: 0.65,
        },
      },

      chart: {
        zoom: {
          enabled: false,
        },
        fontFamily:
          'font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";',
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: "20px",
          fontWeight: "bold",
        },
      },
      stroke: {
        show: true,
        curve: "smooth",
        lineCap: "butt",
        width: 3,
        dashArray: 0,
      },
      title: {
        text: "Area Installed",
        align: "left",
        style: {
          fontSize: "20px",
          fontWeight: 600,
          color: props.dark ? "#f4f4f5" : "#111827",
        },
      },
      subtitle: {
        text: "(+43%) than last year",
        align: "left",
        margin: 10,

        floating: false,
        style: {
          fontSize: "16px",
          fontWeight: "normal",
          color: "#9699a2",
        },
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
        strokeDashArray: 4,
        borderColor: props.dark ? "#27272a" : "#e5e7eb",
      },
      yaxis: {
        labels: {
          style: {
            colors: props.dark ? "#f3f4f6" : "#9ca3af",
            fontSize: "12px",

            fontWeight: 400,
          },
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: props.dark ? "#f3f4f6" : "#9ca3af",
            fontSize: "12px",

            fontWeight: 400,
          },
        },
      },
    },
  };

  return (
    <div className="rounded-2xl  p-5 border  dark:border-zinc-900  border-gray-100 dark:bg-black">
      <Chart
        options={options.options}
        series={[
          {
            name: "2022",
            data: props.data,
          },
        ]}
        type="line"
        height={450}
      />
    </div>
  );
}
