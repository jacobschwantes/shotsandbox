import { NextPageContext, NextComponentType } from "next";
import { Config, GradientConfig } from "@customTypes/configs";
import { RefreshIcon } from "@heroicons/react/solid";
import { Range, Tabs } from "@components/index";
import clsx from "clsx";
import { XIcon } from "@heroicons/react/outline";
import { AnimatePresence, Reorder, useDragControls } from "framer-motion";
import { uniqueId } from "lodash";
import { Tooltip, ColorPicker } from "@components/index";
interface BackgroundProps {
  config: Config;
  updateConfig: (newConfig: Partial<Config>) => void;
  colorPresets: string[];
  gradientPresets: GradientConfig[];
}
const Background: NextComponentType<NextPageContext, {}, BackgroundProps> = ({
  config,
  updateConfig,
  colorPresets,
  gradientPresets,
}) => (
  <>
    <Tabs
      selected={config.background.type}
      tabs={["gradient", "solid"]}
      setSelected={(type) =>
        updateConfig({
          background: {
            ...config.background,
            type,
          },
        })
      }
    />
    {config.background.type === "gradient" ? (
      <>
        <Range
          label="degree"
          value={config.background.gradient.direction}
          set={(val) =>
            updateConfig({
              background: {
                ...config.background,
                gradient: {
                  ...config.background.gradient,
                  direction: val,
                },
              },
            })
          }
          min={0}
          max={359}
        >
          <div className="flex space-x-2 items-center">
            <p className=" font-medium text-zinc-300">Direction</p>
            <button
              className="hover:text-zinc-400 transition-colors"
              onClick={() => {
                updateConfig({
                  background: {
                    ...config.background,
                    gradient: {
                      ...config.background.gradient,
                      direction: 90,
                    },
                  },
                });
              }}
            >
              <RefreshIcon className="h-4" />
            </button>
          </div>
        </Range>
        <div className=" space-y-7  ">
          <label className="font-medium text-zinc-300">Colors</label>

          <GradientList
            list={config.background.gradient.stops}
            setList={(newList) => {
              updateConfig({
                background: {
                  ...config.background,
                  gradient: {
                    ...config.background.gradient,
                    stops: newList,
                  },
                },
              });
            }}
          />
        </div>
        <div className="space-y-2">
          <label className="font-medium text-zinc-300">Presets</label>
          <div className="grid grid-cols-7 gap-2">
            {gradientPresets.map(({ stops, direction }) => (
              <button
                style={{
                  background: `linear-gradient(${90}deg, ${stops
                    .map((item) => item.color)
                    .join(",")})`,
                }}
                onClick={() =>
                  updateConfig({
                    background: {
                      ...config.background,
                      gradient: {
                        stops,
                        direction,
                      },
                    },
                  })
                }
                className="aspect-square h-full rounded-full border border-zinc-600"
              ></button>
            ))}
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="space-y-2">
          <label className="font-medium text-zinc-300">Color</label>
          <ColorPicker
            type="hex"
            color={config.background.color}
            setColor={(val) => {
              updateConfig({
                background: {
                  ...config.background,
                  color: val,
                },
              });
            }}
          />
        </div>
        <div className="space-y-2">
          <label className="font-medium text-zinc-300">Presets</label>
          <div className="grid grid-cols-7 gap-2">
            {colorPresets.map((color) => (
              <button
                style={{ background: color }}
                onClick={() =>
                  updateConfig({
                    background: {
                      ...config.background,
                      color,
                    },
                  })
                }
                className="aspect-square h-full rounded-full border border-zinc-600"
              ></button>
            ))}
          </div>
        </div>
      </>
    )}
  </>
);

interface ListProps {
  list: { color: string; id: number | string }[];
  setList: (list: { color: string; id: number | string }[]) => void;
}
function GradientList({ list, setList }: ListProps) {
  const addStop = (index: number) => {
    const newItem = { color: "#ffffff", id: uniqueId("#ffffff") };
    console.log(newItem);
    const newList = [...list];
    newList.splice(index, 0, newItem);
    setList(newList);
  };
  const removeStop = (id: string | number) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };
  const changeColor = (idx: number, color: string) => {
    const newList = [...list];
    newList[idx] = { ...newList[idx], color };
    setList(newList);
  };
  return (
    <div className="relative w-full">
      <div
        className="w-[95%] h-4 flex absolute left-1/2 border border-zinc-600 border-opacity-30  -translate-x-1/2 top-1/2 -translate-y-1/2 z-0 rounded-full"
        style={{
          background: `linear-gradient(${70}deg, ${list
            .map((item) => item.color)
            .join(",")})`,
        }}
      >
        {Array.from(Array(list.length - 1)).map((item, index) => (
          <Tooltip label="+">
            <button
              className="w-full"
              onClick={(e) => {
                addStop(index + 1);
              }}
            ></button>
          </Tooltip>
        ))}
      </div>

      <Reorder.Group
        axis="x"
        className="flex justify-between w-full"
        values={list}
        onReorder={setList}
      >
        <AnimatePresence initial={false}>
          {list.map(
            (item: { color: string; id: string | number }, index: number) => (
              <Item
                changeColor={(newColor) => changeColor(index, newColor)}
                key={item.id}
                item={item}
                removeStop={removeStop}
                canDelete={list.length > 2}
              />
            )
          )}
        </AnimatePresence>
      </Reorder.Group>
    </div>
  );
}
interface ItemProps {
  item: { color: string; id: string | number };
  changeColor: (newColor: string) => void;
  removeStop: (id: string | number) => void;
  canDelete: boolean;
}
const Item = ({ item, changeColor, removeStop, canDelete }: ItemProps) => {
  const dragControls = useDragControls();
  return (
    <Reorder.Item
      value={item}
      id={`${item.id}`}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.15 },
      }}
      exit={{ opacity: 0, y: 10, transition: { duration: 0.3 } }}
      dragControls={dragControls}
      dragListener={false}
      className="select-none"
    >
      <div className="flex flex-col items-center relative select-none ">
        <Tooltip label="Move">
          <div className="cursor-grab active:cursor-grabbing absolute select-none -top-5 rotate-90">
            <svg
              className="h-4 w-4 text-zinc-400 hover:text-zinc-200 transition-all active:text-zinc-200 select-none"
              stroke="currentColor"
              fill="currentColor"
              onPointerDown={(event) => dragControls.start(event)}
              viewBox="0 0 24 24"
            >
              <path d="M15,5 L17,5 L17,3 L15,3 L15,5 Z M7,5 L9,5 L9,3 L7,3 L7,5 Z M15,13 L17,13 L17,11 L15,11 L15,13 Z M7,13 L9,13 L9,11 L7,11 L7,13 Z M15,21 L17,21 L17,19 L15,19 L15,21 Z M7,21 L9,21 L9,19 L7,19 L7,21 Z"></path>
            </svg>
          </div>
        </Tooltip>
        <ColorPicker type="hex" color={item.color} setColor={changeColor} />
        {canDelete && (
          <Tooltip placement="bottom" label="Remove">
            <button
              className="absolute -bottom-5"
              onClick={() => removeStop(item.id)}
            >
              <XIcon className="h-4 w-4 text-zinc-400 hover:text-zinc-200 transition-all" />
            </button>
          </Tooltip>
        )}
      </div>
    </Reorder.Item>
  );
};

export default Background;
