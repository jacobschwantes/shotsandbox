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
        " px-3 py-2 rounded-xl border-2 shadow-xl z-10 flex space-x-1 items-center bg-opacity-80 "
      )}
    >
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none">
        <g>
          <g id="Camera">
            <path
              id="Stroke 2"
              d="M15.4381 12.4983C15.4381 10.7614 14.0297 9.35303 12.2928 9.35303C10.556 9.35303 9.14758 10.7614 9.14758 12.4983C9.14758 14.2351 10.556 15.6436 12.2928 15.6436C14.0297 15.6436 15.4381 14.2351 15.4381 12.4983Z"
              stroke="currentColor"
            />
            <path
              id="Stroke 4"
              d="M12.2926 20.2002C20.3378 20.2002 21.2957 17.7897 21.2957 12.5665C21.2957 8.90545 20.8115 6.94651 17.7621 6.1044C17.4821 6.01598 17.1715 5.84756 16.92 5.57072C16.5136 5.12545 16.2168 3.75809 15.2357 3.3444C14.2547 2.93177 10.3147 2.95072 9.34943 3.3444C8.38522 3.73914 8.07153 5.12545 7.66522 5.57072C7.41364 5.84756 7.10417 6.01598 6.82311 6.1044C3.77364 6.94651 3.28943 8.90545 3.28943 12.5665C3.28943 17.7897 4.24732 20.2002 12.2926 20.2002Z"
              stroke="currentColor"
            />
            <path id="Stroke 11" d="M17.2046 9H17.2136" stroke="currentColor" />
          </g>
        </g>
      </svg>
      <span className=" leading-none">
        <p className="text-sm italic">made with</p>
        <h1 className="font-medium lowercase text-2xl">Screenshotify</h1>
      </span>
    </span>
  )
);
Watermark.displayName = "Watermark";

export default Watermarks;
