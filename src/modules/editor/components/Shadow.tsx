import { NextPageContext, NextComponentType } from "next";
import { ImageConfig, ShadowConfig } from "@customTypes/configs";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { ColorPicker } from "@components/index";
import clsx from "clsx";
interface ShadowProps {
  layer: ImageConfig;
  updateLayer: (newlayer: Partial<ImageConfig>) => void;
  presets: Partial<ShadowConfig>[];
}
const Shadow: NextComponentType<NextPageContext, {}, ShadowProps> = ({
  updateLayer,
  layer,
  presets,
}) => (
  <>
    <div className=" space-y-2">
      <label className="font-medium text-zinc-700">Color</label>
      <div className="flex justify-between items-center">
        <ColorPicker
          type="rgba"
          color={layer.shadow.color}
          setColor={(val) => {
            updateLayer({
              shadow: {
                ...layer.shadow,
                color: val,
              },
            });
          }}
        />

        <button
          onClick={() => {
            updateLayer({
              shadow: {
                ...layer.shadow,
                color: "rgba(17, 12, 46, 0.2)",
              },
            });
          }}
          className="flex items-center justify-center space-x-2 border border-zinc-200 text-zinc-800  bg-white hover:bg-zinc-50 transition-all cursor-pointer p-3 rounded-lg font-medium"
        >
          <ArrowPathIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
    <div className="space-y-2">
      <label className="font-medium text-zinc-700">Size</label>
      <div className="grid grid-cols-2 gap-5">
        {presets.map((item, index) => (
          <div key={index} className="space-y-2">
            <button
              onClick={() =>
                updateLayer({
                  shadow: {
                    ...layer.shadow,
                    ...item,
                  },
                })
              }
              className={clsx(
                layer.shadow.type === item.type
                  ? "outline-sky-500"
                  : "outline-zinc-300",
                "rounded-lg  bg-zinc-100 p-7 w-full outline  hover:outline-sky-500 transition-all duration-300 outline-1"
              )}
            >
              <div
                style={{
                  boxShadow: `${item.previewSize} ${layer.shadow.color}`,
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
