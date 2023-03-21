import { NextPageContext, NextComponentType } from "next";
import { Config } from "@customTypes/configs";
import { RefreshIcon } from "@heroicons/react/solid";
import { Range } from "@components/index";
interface RotationProps {
  config: Config;
  updateConfig: (newConfig: Partial<Config>) => void;
}
const Rotation: NextComponentType<NextPageContext, {}, RotationProps> = ({
  config,
  updateConfig,
}) => (
  <div className="space-y-14">
    <Range
      showValues={false}
      value={config.orientation.perspective}
      set={(val) =>
        updateConfig({
          orientation: {
            ...config.orientation,
            perspective: val,
          },
        })
      }
      min={400}
      max={3000}
    >
      <div className="flex space-x-2 items-center">
        <p className=" font-medium text-zinc-700 whitespace-nowrap">
          Perspective
        </p>
        <button
          className="hover:text-zinc-400 transition-colors"
          onClick={() => {
            updateConfig({
              orientation: {
                ...config.orientation,
                perspective: 3000,
              },
            });
          }}
        >
          <RefreshIcon className="h-4" />
        </button>
      </div>
    </Range>
    <Range
      label="degree"
      value={config.orientation.rotateX}
      set={(val) =>
        updateConfig({
          orientation: {
            ...config.orientation,
            rotateX: val,
          },
        })
      }
      min={-45}
      max={45}
    >
      <div className="flex space-x-2 items-center">
        <p className=" font-medium text-zinc-700 whitespace-nowrap">Rotate X</p>
        <button
          className="hover:text-zinc-400 transition-colors"
          onClick={() => {
            updateConfig({
              orientation: {
                ...config.orientation,
                rotateX: 0,
              },
            });
          }}
        >
          <RefreshIcon className="h-4" />
        </button>
      </div>
    </Range>
    <Range
      label="degree"
      value={config.orientation.rotateY}
      set={(val) =>
        updateConfig({
          orientation: {
            ...config.orientation,
            rotateY: val,
          },
        })
      }
      min={-45}
      max={45}
    >
      <div className="flex space-x-2 items-center">
        <p className=" font-medium text-zinc-700 whitespace-nowrap">Rotate Y</p>
        <button
          className="hover:text-zinc-400 transition-colors"
          onClick={() => {
            updateConfig({
              orientation: {
                ...config.orientation,
                rotateY: 0,
              },
            });
          }}
        >
          <RefreshIcon className="h-4" />
        </button>
      </div>
    </Range>
    <Range
      label="degree"
      value={config.orientation.rotateZ}
      set={(val) =>
        updateConfig({
          orientation: {
            ...config.orientation,
            rotateZ: val,
          },
        })
      }
      min={-45}
      max={45}
    >
      <div className="flex space-x-2 items-center">
        <p className=" font-medium whitespace-nowrap text-zinc-700">Rotate Z</p>
        <button
          className="hover:text-zinc-400 transition-colors"
          onClick={() => {
            updateConfig({
              orientation: {
                ...config.orientation,
                rotateZ: 0,
              },
            });
          }}
        >
          <RefreshIcon className="h-4" />
        </button>
      </div>
    </Range>
    <Range
      label="percent"
      value={config.size.scale}
      set={(val) =>
        updateConfig({
          size: {
            ...config.size,
            scale: val,
          },
        })
      }
      min={50}
      max={150}
    >
      <div className="flex space-x-2 items-center">
        <p className=" font-medium text-zinc-700">Scale</p>
        <button
          className="hover:text-zinc-400 transition-colors"
          onClick={() => {
            updateConfig({
              size: {
                ...config.size,
                scale: 80,
              },
            });
          }}
        >
          <RefreshIcon className="h-4" />
        </button>
      </div>
    </Range>
    <div className="space-y-2">
      <p className=" font-medium text-zinc-700">Presets</p>
      <div className="grid grid-cols-2 gap-5">
        <button
          onClick={() => {
            updateConfig({
              size: {
                ...config.size,
                scale: 90,
              },
              position: {
                x: 0,
                y: 0,
              },
              orientation: {
                rotateX: 45,
                rotateY: 0,
                rotateZ: 0,
                perspective: 3000,
              },
            });
          }}
          style={{ perspective: "800px" }}
          className="border  border-zinc-300 rounded-lg flex items-center justify-center p-4  hover:border-sky-500 transition-all duration-300"
        >
          <div
            style={{ transform: "rotateX(50deg)" }}
            className="bg-zinc-400 rounded flex-1 aspect-video"
          ></div>
        </button>
        <button
          onClick={() => {
            updateConfig({
              size: {
                ...config.size,
                scale: 90,
              },
              position: {
                x: 0,
                y: 0,
              },
              orientation: {
                rotateX: 45,
                rotateY: 10,
                rotateZ: -35,
                perspective: 3000,
              },
            });
          }}
          style={{ perspective: "800px" }}
          className="border  border-zinc-300 rounded-lg flex items-center justify-center p-4  hover:border-sky-500 transition-all duration-300"
        >
          <div
            style={{
              transform: "rotateZ(-25deg) rotateY(30deg) rotateX(40deg)",
            }}
            className="bg-zinc-400 rounded flex-1 aspect-video  "
          ></div>
        </button>
      </div>
    </div>
    <button
      onClick={() => {
        updateConfig({
          size: {
            ...config.size,
            scale: 80,
          },
          position: {
            x: 0,
            y: 0,
          },
          orientation: {
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            perspective: 3000,
          },
        });
      }}
      className="flex items-center justify-center space-x-2 border border-zinc-200 text-zinc-800  bg-white hover:bg-zinc-50 transition-all cursor-pointer px-4 py-3 rounded-lg font-medium"
    >
      <RefreshIcon className="h-4 w-4" />
      <span>Reset</span>
    </button>
  </div>
);
export default Rotation;
