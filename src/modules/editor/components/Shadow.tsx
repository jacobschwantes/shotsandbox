import { NextPageContext, NextComponentType } from "next";
import { Config, ShadowConfig } from "@customTypes/configs";
import { RefreshIcon } from "@heroicons/react/solid";
import { ColorPicker } from "@components/index";
import clsx from "clsx";
interface ShadowProps {
  config: Config;
  updateConfig: (newConfig: Partial<Config>) => void;
  presets: ShadowConfig[];
}
const Shadow: NextComponentType<NextPageContext, {}, ShadowProps> = ({
  updateConfig,
  config,
  presets,
}) => (
  <>
    <div className=" space-y-2">
      <label className="font-medium text-zinc-300">Color</label>
      <div className="flex justify-between items-center">
        <ColorPicker
          type="rgba"
          color={config.shadow.color}
          setColor={(val) => {
            updateConfig({
              shadow: {
                ...config.shadow,
                color: val,
              },
            });
          }}
        />

        <button
          onClick={() => {
            updateConfig({
              shadow: {
                ...config.shadow,
                color: "rgba(17, 12, 46, 0.2)",
              },
            });
          }}
          className="flex items-center justify-center space-x-2 border border-zinc-800 text-zinc-200 bg-zinc-900 hover:bg-zinc-800 bg-opacity-25 hover:bg-opacity-25 transition-all cursor-pointer bg p-2 rounded-lg"
        >
          <RefreshIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
    <div className="space-y-2">
      <label className="font-medium text-zinc-300">Size</label>
      <div className="grid grid-cols-2 gap-5">
        {presets.map((item) => (
          <div className="space-y-2">
            <button
              onClick={() =>
                updateConfig({
                  shadow: {
                    ...config.shadow,
                    ...item,
                  },
                })
              }
              className={clsx(
                config.shadow.type === item.type
                  ? "outline-blue-500"
                  : "outline-zinc-800",
                "rounded-lg  bg-zinc-100 p-7 w-full outline  hover:outline-blue-500 transition-all duration-300"
              )}
            >
              <div
                style={{
                  boxShadow: `${item.previewSize} ${config.shadow.color}`,
                }}
                className="bg-white p-5 rounded-lg aspect-square"
              ></div>
            </button>
            <p className="text-xs font-medium uppercase text-zinc-400">
              {item.type}
            </p>
          </div>
        ))}
      </div>
    </div>
  </>
);
export default Shadow;
