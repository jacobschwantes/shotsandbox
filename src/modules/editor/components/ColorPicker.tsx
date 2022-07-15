import { NextComponentType, NextPageContext } from "next";
import { Popover, Transition } from "@headlessui/react";
import { HexColorPicker } from "react-colorful";
import { Fragment } from "react";
import clsx from "clsx";
interface ColorPickerProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  cssVariable: string;
}

const ColorPicker: NextComponentType<NextPageContext, {}, ColorPickerProps> = ({
  color,
  setColor,
  cssVariable,
}) => (
  <Popover className="relative">
    {({ open }) => (
      <>
        <Popover.Button
          className={clsx(
            "rounded-full p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 border-gray-100 border-2 ",
            cssVariable === "gradient1"
              ? "bg-[color:var(--gradient-stop-1)]"
              : cssVariable === "gradient2"
              ? "bg-[color:var(--gradient-stop-2)]"
              : "bg-[color:var(--bg-color)]"
          )}
        ></Popover.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute  z-10 mt-3 right-0">
            <div>
              <HexColorPicker color={color} onChange={setColor} />
              {/* <HexColorInput color={bgColor} onChange={setBgColor} /> */}
            </div>
          </Popover.Panel>
        </Transition>
      </>
    )}
  </Popover>
);

export default ColorPicker;
