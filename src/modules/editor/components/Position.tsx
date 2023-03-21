import { Config } from "@customTypes/configs";
import { NextPageContext, NextComponentType } from "next";
import { Range } from "@components/index";
import { RefreshIcon } from "@heroicons/react/solid";
interface PositionProps {
  config: Config;
  updateConfig: (newConfig: Partial<Config>) => void;
}
const Position: NextComponentType<NextPageContext, {}, PositionProps> = ({
  updateConfig,
  config,
}) => (
  <div className="space-y-6">
    {/* <div className="overflow-hidden border border-zinc-800 rounded-xl relative min-w-[230px] min-h-[200px]">
      <button
        onClick={() => {
          updateConfig({
            position: {
              x: 50,
              y: -50,
            },
          });
        }}
        className=" h-12 aspect-video border border-zinc-800 hover:border-sky-500 transition-all duration-300 rounded-lg absolute -right-1 -top-1 "
      />
      <button
        onClick={() => {
          updateConfig({
            position: {
              x: -50,
              y: -50,
            },
          });
        }}
        className=" h-12 aspect-video border border-zinc-800 hover:border-sky-500 transition-all duration-300  rounded-lg absolute -left-1 -top-1 "
      />
      <button
        onClick={() => {
          updateConfig({
            position: {
              x: 50,
              y: 50,
            },
          });
        }}
        className=" h-12 aspect-video border border-zinc-800 hover:border-sky-500 transition-all duration-300 rounded-lg absolute -right-1 -bottom-1 "
      />
      <button
        onClick={() => {
          updateConfig({
            position: {
              x: -50,
              y: 50,
            },
          });
        }}
        className=" h-12 aspect-video border border-zinc-800 hover:border-sky-500 transition-all duration-300 rounded-lg absolute -left-1 -bottom-1 "
      />
      <button
        onClick={() => {
          updateConfig({
            position: {
              x: 0,
              y: 50,
            },
          });
        }}
        className=" h-12 aspect-video border border-zinc-800 hover:border-sky-500 transition-all duration-300 rounded-lg absolute left-1/2 -bottom-1 -translate-x-1/2 "
      />
      <button
        onClick={() => {
          updateConfig({
            position: {
              x: 0,
              y: 0,
            },
          });
        }}
        className=" h-12 aspect-video border border-zinc-800 hover:border-sky-500 transition-all duration-300 rounded-lg absolute left-1/2 bottom-1/2 -translate-x-1/2 translate-y-1/2 "
      />
      <button
        onClick={() => {
          updateConfig({
            position: {
              x: 0,
              y: -50,
            },
          });
        }}
        className=" h-12 aspect-video border border-zinc-800 hover:border-sky-500 transition-all duration-300 rounded-lg absolute left-1/2 -top-1 -translate-x-1/2 "
      />
      <button
        onClick={() => {
          updateConfig({
            position: {
              x: -50,
              y: 0,
            },
          });
        }}
        className=" h-12 aspect-video border border-zinc-800 hover:border-sky-500 transition-all duration-300 rounded-lg absolute -left-1 bottom-1/2  translate-y-1/2 "
      />
      <button
        onClick={() => {
          updateConfig({
            position: {
              x: 50,
              y: 0,
            },
          });
        }}
        className=" h-12 aspect-video border border-zinc-800 hover:border-sky-500 transition-all duration-300 rounded-lg absolute -right-1 bottom-1/2  translate-y-1/2 "
      />
    </div> */}
    <div className="space-y-14">
      <Range
        min={-100}
        max={100}
        label="percent"
        value={config.position.x}
        set={(val) =>
          updateConfig({
            position: { ...config.position, x: val },
          })
        }
      >
        <div className="flex space-x-2 items-center">
          <p className="font-medium text-zinc-700">X</p>
          <button
            className="hover:text-zinc-400 transition-colors"
            onClick={() => {
              updateConfig({
                position: { ...config.position, x: 0 },
              });
            }}
          >
            <RefreshIcon className="h-4" />
          </button>
        </div>
      </Range>
      <Range
        min={-100}
        max={100}
        label="percent"
        value={config.position.y}
        set={(val) =>
          updateConfig({
            position: { ...config.position, y: val },
          })
        }
      >
        <div className="flex space-x-2 items-center">
          <p className="font-medium text-zinc-700">Y</p>
          <button
            className="hover:text-zinc-400 transition-colors"
            onClick={() => {
              updateConfig({
                position: { ...config.position, y: 0 },
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
      <button
        onClick={() => {
          updateConfig({
            position: {
              x: 0,
              y: 0,
            },
            size: {
              ...config.size,
              scale: 80,
            },
          });
        }}
        className="flex items-center justify-center space-x-2 border border-zinc-200 text-zinc-800  bg-white hover:bg-zinc-50 transition-all cursor-pointer px-4 py-3 rounded-lg font-medium"
      >
        <RefreshIcon className="h-4 w-4" />
        <span>Reset</span>
      </button>
    </div>
  </div>
);
export default Position;
