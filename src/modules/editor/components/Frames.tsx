import { Config, FrameConfig } from "@customTypes/configs";
import { NextPageContext, NextComponentType } from "next";
import { Range, Toggle } from "@components/index";
import { RefreshIcon } from "@heroicons/react/solid";
import clsx from "clsx";
interface FramesProps {
  config: Config;
  updateConfig: (newConfig: Partial<Config>) => void;
  presets: { type: string; config: FrameConfig }[];
}
const Frames: NextComponentType<NextPageContext, {}, FramesProps> = ({
  config,
  updateConfig,
  presets,
}) => {
  console.log(config);

  return (
    <>
      <div className="space-y-3">
        <h2 className="font-medium text-zinc-200 text-base">Toolbar</h2>
        <Range
          step={0.01}
          showValues={false}
          min={0.3}
          max={1}
          value={config.frame.opacity}
          set={(value) =>
            updateConfig({
              frame: {
                ...config.frame,
                opacity: value,
              },
            })
          }
        >
          <div className="flex space-x-2 items-center">
            <p className=" font-medium text-zinc-300">Opacity</p>
            <button
              className="hover:text-zinc-400 transition-colors"
              onClick={() => {
                updateConfig({
                  frame: {
                    ...config.frame,
                    opacity: 1,
                  },
                });
              }}
            >
              <RefreshIcon className="h-4" />
            </button>
          </div>
        </Range>
        <Toggle
          enabled={config.frame.show}
          setEnabled={(value) =>
            updateConfig({
              frame: {
                ...config.frame,
                show: value,
              },
            })
          }
        >
          <p className="font-medium text-zinc-300 whitespace-nowrap">Show</p>
        </Toggle>
        <Toggle
          enabled={config.frame.dark}
          setEnabled={(value) =>
            updateConfig({
              frame: {
                ...config.frame,
                dark: value,
              },
            })
          }
        >
          <p className="font-medium text-zinc-300 whitespace-nowrap">Dark</p>
        </Toggle>
      </div>

      <div className="space-y-3">
        <h2 className="font-medium text-zinc-200 text-base">Buttons</h2>
        <Toggle
          enabled={config.frame.buttons.solid}
          setEnabled={(value) =>
            updateConfig({
              frame: {
                ...config.frame,
                buttons: {
                  ...config.frame.buttons,
                  solid: value,
                },
              },
            })
          }
        >
          <p className="font-medium text-zinc-300 whitespace-nowrap">Solid</p>
        </Toggle>
        <Toggle
          enabled={config.frame.buttons.dark}
          setEnabled={(value) =>
            updateConfig({
              frame: {
                ...config.frame,
                buttons: {
                  ...config.frame.buttons,
                  dark: value,
                },
              },
            })
          }
        >
          <p className="font-medium text-zinc-300 whitespace-nowrap">Dark</p>
        </Toggle>
      </div>
      <div className="space-y-3">
        <h2 className="font-medium text-zinc-200 text-base">Search Bar</h2>
        <Toggle
          enabled={config.frame.searchBar.show}
          setEnabled={(value) =>
            updateConfig({
              frame: {
                ...config.frame,
                searchBar: {
                  ...config.frame.searchBar,
                  show: value,
                },
              },
            })
          }
        >
          <p className="font-medium text-zinc-300 whitespace-nowrap">Show</p>
        </Toggle>
      </div>
      <div className="space-y-3">
        <h2 className="font-medium text-zinc-200 text-base">Presets</h2>
        <div className="space-y-3">
          {presets.map((item, index) => (
            <button
              key={index}
              onClick={() =>
                updateConfig({
                  frame: {
                    ...item.config,
                  },
                })
              }
              className={clsx(
                item.config === config.frame && "border-sky-600",
                "p-5 rounded-lg bg-gradient-to-tr bg-zinc-900 border border-zinc-800 hover:border-sky-600 transition-all duration-300 w-full"
              )}
            >
              <div className=" rounded-t-md overflow-hidden relative h-5">
                <PreviewToolbar options={item.config} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* <div className="grid grid-cols-2 gap-3">
    {framePresets.map((item) => (
      <div style={{
        background: `linear-gradient(70deg, ${gradientStop1}, ${gradientStop2})`,
      }} className="p-6 rounded-lg overflow-hidden aspect-square">
        <div className="rounded-lg overflow-hidden relative aspect-video h-[1080px] w-[1920pc]">
          <Toolbar options={item.config} />
          <img
            className="flex-1 mt-11"
            src={item.preview}
          ></img>
        </div>
      </div>
    ))}
  </div> */}
    </>
  );
};

interface ToolbarProps {
  width: number;
  height: number;
  options: {
    show: boolean;
    dark: boolean;
    opacity: number;
    buttons: {
      show: boolean;
      dark: boolean;
      solid: boolean;
    };
    searchBar: {
      show: boolean;
    };
  };
}

export const Toolbar: NextComponentType<NextPageContext, {}, ToolbarProps> = ({
  options: { dark, buttons, searchBar, opacity },
  width,
  height,
}) => {
  return (
    <div className="w-full z-10">
      <div
        style={{
          opacity,
          paddingTop: `${0.015 * height}px`,
          paddingBottom: `${0.015 * height}px`,
          paddingLeft: `${0.025 * height}px`,
          paddingRight: `${0.025 * height}px`,
        }}
        className={clsx(
          dark ? "bg-zinc-700" : "bg-zinc-200 ",
          "relative w-full "
        )}
      >
        {searchBar.show && (
          <div
            style={{
              height: `${Math.ceil(0.025 * height)}px`,
              borderRadius: `${Math.ceil(0.008 * height)}px`,
            }}
            className={clsx(
              dark ? "bg-zinc-500" : "bg-zinc-400",
              "absolute w-2/5 inset-0 m-auto"
            )}
          ></div>
        )}
        <div
          style={
            {
              "--toolbar-spacing": `${Math.ceil(0.015 * height)}px`,
            } as React.CSSProperties
          }
          className="flex toolbar-button-spaced "
        >
          <span
            style={{
              height: `${Math.ceil(0.025 * height)}px`,
              borderWidth: `${Math.ceil(0.00125 * width)}px`,
            }}
            className={clsx(
              buttons.dark
                ? "bg-zinc-500  border-zinc-500"
                : "bg-red-500 border-red-500",
              !buttons.solid && "bg-transparent",
              "rounded-full aspect-square  "
            )}
          ></span>
          <span
            style={{
              height: `${Math.ceil(0.025 * height)}px`,
              borderWidth: `${Math.ceil(0.00125 * width)}px`,
            }}
            className={clsx(
              buttons.dark
                ? "bg-zinc-500  border-zinc-500"
                : "bg-yellow-500 border-yellow-500",
              !buttons.solid && "bg-transparent",
              "rounded-full aspect-square border "
            )}
          ></span>
          <span
            style={{
              height: `${Math.ceil(0.025 * height)}px`,
              borderWidth: `${Math.ceil(0.00125 * width)}px`,
            }}
            className={clsx(
              buttons.dark
                ? "bg-zinc-500  border-zinc-500"
                : "bg-green-500 border-green-500",
              !buttons.solid && "bg-transparent",
              " rounded-full  aspect-square border"
            )}
          ></span>
        </div>
      </div>
    </div>
  );
};
interface PreviewToolbarProps {
  options: {
    show: boolean;
    dark: boolean;
    opacity: number;
    buttons: {
      show: boolean;
      dark: boolean;
      solid: boolean;
    };
    searchBar: {
      show: boolean;
    };
  };
}
export const PreviewToolbar: NextComponentType<
  NextPageContext,
  {},
  PreviewToolbarProps
> = ({ options: { dark, buttons, searchBar, opacity } }) => {
  return (
    <div className="w-full absolute  z-10 bg-transparent">
      <div
        style={{ opacity }}
        className={clsx(
          dark ? "bg-zinc-700" : "bg-zinc-200 ",
          "relative w-full py-1 px-2"
        )}
      >
        {searchBar.show && (
          <div
            className={clsx(
              searchBar.show && "hidden",
              dark ? "bg-zinc-500" : "bg-zinc-400",
              "absolute w-2/5 inset-0 m-auto h-1.5 rounded-md"
            )}
          ></div>
        )}
        <div className="flex space-x-1">
          <span
            className={clsx(
              buttons.dark
                ? "bg-zinc-500  border-zinc-500"
                : "bg-red-500 border-red-500",
              !buttons.solid && "bg-transparent",
              "p-1 rounded-full border"
            )}
          ></span>
          <span
            className={clsx(
              buttons.dark
                ? "bg-zinc-500  border-zinc-500"
                : "bg-yellow-500 border-yellow-500",
              !buttons.solid && "bg-transparent",
              "p-1 rounded-full border"
            )}
          ></span>
          <span
            className={clsx(
              buttons.dark
                ? "bg-zinc-500  border-zinc-500"
                : "bg-green-500 border-green-500",
              !buttons.solid && "bg-transparent",
              "p-1 rounded-full border"
            )}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default Frames;
