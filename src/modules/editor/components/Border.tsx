import { NextPageContext, NextComponentType } from "next";
import { Config } from "@customTypes/configs";
import { RefreshIcon } from "@heroicons/react/solid";
import { Range, ColorPicker } from "@components/index";
interface BorderProps {
  config: Config;
  updateConfig: (newConfig: Partial<Config>) => void;
}
const Border: NextComponentType<NextPageContext, {}, BorderProps> = ({
  config,
  updateConfig,
}) => (
  <>
    <div className=" space-y-2">
      <label className="font-medium  text-zinc-300">Color</label>
      <div className="flex justify-between items-center">
        <ColorPicker
          type="rgba"
          color={config.border.color}
          setColor={(val) =>
            updateConfig({
              border: {
                ...config.border,
                color: val,
              },
            })
          }
        />

        <button
          onClick={() => {
            updateConfig({
              border: {
                ...config.border,
                color: "rgba(0, 0, 0, 1)",
              },
            });
          }}
          className="flex items-center justify-center space-x-2 border border-zinc-800 text-zinc-200 bg-zinc-900 hover:bg-zinc-800 bg-opacity-25 hover:bg-opacity-25 transition-all cursor-pointer bg p-2 rounded-lg"
        >
          <RefreshIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
    <Range
      step={0.1}
      showValues={false}
      value={config.border.radius}
      set={(val) =>
        updateConfig({
          border: {
            ...config.border,
            radius: val,
          },
        })
      }
      min={0}
      max={2}
    >
      <div className="flex space-x-2 items-center">
        <p className=" font-medium text-zinc-300">Border Radius</p>
        <button
          className="hover:text-zinc-400 transition-colors"
          onClick={() => {
            updateConfig({
              border: {
                ...config.border,
                radius: 0.5,
              },
            });
          }}
        >
          <RefreshIcon className="h-4" />
        </button>
      </div>
    </Range>
    <Range
      step={0.1}
      showValues={false}
      value={config.border.width}
      set={(val) =>
        updateConfig({
          border: {
            ...config.border,
            width: val,
          },
        })
      }
      min={0}
      max={10}
    >
      <div className="flex space-x-2 items-center">
        <p className=" font-medium text-zinc-300">Border Width</p>
        <button
          className="hover:text-zinc-400 transition-colors"
          onClick={() => {
            updateConfig({
              border: {
                ...config.border,
                width: 0,
              },
            });
          }}
        >
          <RefreshIcon className="h-4" />
        </button>
      </div>
    </Range>
  </>
);
export default Border;
