import { NextPageContext, NextComponentType } from "next";
import { ImageConfig } from "@customTypes/configs";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { Range, ColorPicker } from "@components/index";
interface BorderProps {
  layer: ImageConfig;
  updateLayer: (newlayer: Partial<ImageConfig>) => void;
}
const Border: NextComponentType<NextPageContext, {}, BorderProps> = ({
  layer,
  updateLayer,
}) => (
  <>
    <div className=" space-y-2">
      <label className="font-medium  text-zinc-700">Color</label>
      <div className="flex justify-between items-center">
        <ColorPicker
          type="rgba"
          color={layer.border.color}
          setColor={(val) =>
            updateLayer({
              border: {
                ...layer.border,
                color: val,
              },
            })
          }
        />

        <button
          onClick={() => {
            updateLayer({
              border: {
                ...layer.border,
                color: "rgba(0, 0, 0, 1)",
              },
            });
          }}
          className="flex items-center justify-center space-x-2 border border-zinc-200 text-zinc-800  bg-white hover:bg-zinc-50 transition-all cursor-pointer p-3 rounded-lg font-medium"
        >
          <ArrowPathIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
    <Range
      step={0.1}
      showValues={false}
      value={layer.border.radius}
      set={(val) =>
        updateLayer({
          border: {
            ...layer.border,
            radius: val,
          },
        })
      }
      min={0}
      max={2}
    >
      <div className="flex space-x-2 items-center">
        <p className=" font-medium text-zinc-700">Border Radius</p>
        <button
          className="hover:text-zinc-400 transition-colors"
          onClick={() => {
            updateLayer({
              border: {
                ...layer.border,
                radius: 0.5,
              },
            });
          }}
        >
          <ArrowPathIcon className="h-4" />
        </button>
      </div>
    </Range>
    <Range
      step={0.1}
      showValues={false}
      value={layer.border.width}
      set={(val) =>
        updateLayer({
          border: {
            ...layer.border,
            width: val,
          },
        })
      }
      min={0}
      max={10}
    >
      <div className="flex space-x-2 items-center">
        <p className=" font-medium text-zinc-700">Border Width</p>
        <button
          className="hover:text-zinc-400 transition-colors"
          onClick={() => {
            updateLayer({
              border: {
                ...layer.border,
                width: 0,
              },
            });
          }}
        >
          <ArrowPathIcon className="h-4" />
        </button>
      </div>
    </Range>
  </>
);
export default Border;
