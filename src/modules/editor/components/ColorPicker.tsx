import { NextComponentType, NextPageContext } from "next";
import Popover from "./Popover";
import { Transition } from "@headlessui/react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { Fragment } from "react";
import clsx from "clsx";
import React, { cloneElement, useState } from "react";
import {
  Placement,
  offset,
  flip,
  shift,
  autoUpdate,
  useFloating,
  useInteractions,
  useRole,
  useDismiss,
  useId,
  useClick,
  FloatingFocusManager,
  FloatingPortal,
} from "@floating-ui/react-dom-interactions";
interface ColorPickerProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  cssVariable: string;
}

const ColorPicker: NextComponentType<NextPageContext, {}, ColorPickerProps> = ({
  color,
  setColor,
  cssVariable,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Popover
        render={({ close, labelId, descriptionId }) => (
          <HexColorPicker color={color} onChange={setColor} />
        )}
      >
        <button
          className={clsx(
            "rounded-full p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 border-gray-100 border-2 ",
            cssVariable === "gradient1"
              ? "bg-[color:var(--gradient-stop-1)]"
              : cssVariable === "gradient2"
              ? "bg-[color:var(--gradient-stop-2)]"
              : "bg-[color:var(--bg-color)]"
          )}
        />
      </Popover>
      <HexColorInput className="form-input shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md" color={color} onChange={setColor} />
    </div>
  );
};

export default ColorPicker;
