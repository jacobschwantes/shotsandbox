import { NextPageContext, NextComponentType } from "next";
import { Tabs, Toggle } from "@components/index";
import { Config } from "@customTypes/configs";
import clsx from "clsx";
import React, { forwardRef } from "react";
interface WatermarksProps {
  config: Config;
  updateConfig: (newConfig: Partial<Config>) => void;
}
const Watermarks: NextComponentType<NextPageContext, {}, WatermarksProps> = ({
  config,
  updateConfig,
}) => (
  <>
    <Toggle
      enabled={config.watermark.show}
      setEnabled={(value) =>
        updateConfig({
          watermark: {
            ...config.watermark,
            show: value,
          },
        })
      }
    >
      <p className="font-medium text-zinc-300 whitespace-nowrap">Show</p>
    </Toggle>
    <div className="space-y-2">
      <h1 className="block text-sm font-medium text-zinc-100 ">Theme</h1>
      <Tabs
        selected={config.watermark.theme}
        tabs={["dark", "light"]}
        setSelected={(theme) =>
          updateConfig({
            watermark: {
              ...config.watermark,
              theme,
            },
          })
        }
      />
    </div>
    <div className="space-y-2">
      <h1 className="block text-sm font-medium text-zinc-100 ">Placement</h1>
      <div className="overflow-hidden border border-zinc-800 rounded-xl relative min-w-[230px] min-h-[200px]">
        <button
          onClick={() => {
            updateConfig({
              watermark: {
                ...config.watermark,
                placement: "top-right",
              },
            });
          }}
          className={clsx(
            " h-8 aspect-video border hover:border-blue-500 transition-all duration-300 rounded-lg absolute right-3 top-3 ",
            config.watermark.placement === "top-right"
              ? "border-blue-500"
              : "border-zinc-800"
          )}
        />
        <button
          onClick={() => {
            updateConfig({
              watermark: {
                ...config.watermark,
                placement: "top-left",
              },
            });
          }}
          className={clsx(
            " h-8 aspect-video border hover:border-blue-500 transition-all duration-300 rounded-lg absolute left-3 top-3 ",
            config.watermark.placement === "top-left"
              ? "border-blue-500"
              : "border-zinc-800"
          )}
        />
        <button
          onClick={() => {
            updateConfig({
              watermark: {
                ...config.watermark,
                placement: "bottom-right",
              },
            });
          }}
          className={clsx(
            " h-8 aspect-video border hover:border-blue-500 transition-all duration-300 rounded-lg absolute right-3 bottom-3 ",
            config.watermark.placement === "bottom-right"
              ? "border-blue-500"
              : "border-zinc-800"
          )}
        />
        <button
          onClick={() => {
            updateConfig({
              watermark: {
                ...config.watermark,
                placement: "bottom-left",
              },
            });
          }}
          className={clsx(
            "h-8 aspect-video border hover:border-blue-500 transition-all duration-300 rounded-lg absolute left-3 bottom-3 ",
            config.watermark.placement === "bottom-left"
              ? "border-blue-500"
              : "border-zinc-800"
          )}
        />
      </div>
    </div>
  </>
);
const positions = {
  "top-left": "top-5 left-5",
  "top-right": "top-5 right-5",
  "bottom-left": "bottom-5 left-5",
  "bottom-right": "bottom-5 right-5",
};

interface WatermarkProps {
  theme: "dark" | "light";
  placement?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}
export const Watermark = forwardRef<HTMLSpanElement, WatermarkProps>(
  ({ theme, placement }, ref) => (
    <span
      ref={ref}
      className={clsx(
        placement && positions[placement],
        placement && "absolute",
        theme === "dark"
          ? "bg-black border-zinc-600 text-zinc-300"
          : "border-zinc-200 text-black bg-white",
        "px-3 py-2 rounded-lg border-2 shadow-xl z-10 flex space-x-1 items-start bg-opacity-80 flex-col"
      )}
    >
      <img
        className="h-5"
        src={clsx(theme === "dark" ? "logo.png" : "logo_light.png")}
      ></img>
    </span>
  )
);
Watermark.displayName = "Watermark";

export default Watermarks;
