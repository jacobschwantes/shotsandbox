import { NextComponentType, NextPageContext } from "next";
import Popover from "./Popover";
import {
  HexColorPicker,
  HexColorInput,
  RgbaStringColorPicker,
} from "react-colorful";
import React from "react";
interface ColorPickerProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  type: string;
}
const ColorPicker: NextComponentType<NextPageContext, {}, ColorPickerProps> = ({
  color,
  setColor,
  type = "hex",
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Popover
        render={() =>
          type === "hex" ? (
            <div className="bg-zinc-900 p-3 rounded-lg space-y-3">
              <HexColorPicker color={color} onChange={setColor} className="" />
              <div className="flex items-center space-x-3">
                <p className="text-zinc-400 font-bold text-base">HEX</p>
                <HexColorInput
                  className="form-input shadow-sm focus:ring-blue-500 focus:border-blue-500 block sm:text-sm border-zinc-700 rounded-md bg-zinc-800 w-20 text-zinc-300 font-medium"
                  color={color}
                  onChange={setColor}
                />
              </div>
            </div>
          ) : (
            <div className="bg-zinc-900 p-3 rounded-lg space-y-3">
              <RgbaStringColorPicker
                color={color}
                onChange={setColor}
                className=""
              />
              <p>{color}</p>
            </div>
          )
        }
      >
        <button
          style={{ background: color }}
          className="rounded-full p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 border-gray-100 border-2 "
        />
      </Popover>
    </div>
  );
};

export default ColorPicker;
