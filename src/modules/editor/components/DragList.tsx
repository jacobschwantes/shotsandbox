import Tooltip from "@components/Tooltip";
import { ImageDoc, Layer } from "@customTypes/configs";
import { UploadIcon, XIcon } from "@heroicons/react/outline";
import { PhotographIcon } from "@heroicons/react/solid";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import React from "react";
interface ListProps {
  list: Layer[];
  setList: (newList: Layer[]) => void;
  replaceImage: (
    event: React.ChangeEvent<HTMLInputElement>,
    idx: number,
    id: string
  ) => void;
}
export default function List({
  list,
  setList,
  replaceImage,
}: ListProps) {
  return (
    <Reorder.Group
      axis="y"
      className="space-y-2"
      values={list}
      onReorder={setList}
    >
      {list.map((item: Layer, index: number) => (
        <Item
          // removeImage={removeImage}
          replaceImage={replaceImage}
          idx={index}
          key={item.id}
          item={item}
        />
      ))}
    </Reorder.Group>
  );
}
interface ItemProps {
  item: Layer;
  idx: number;
  replaceImage: (
    event: React.ChangeEvent<HTMLInputElement>,
    idx: number,
    id: string
  ) => void;
  // removeImage: (id: string) => void;
}
export const Item = ({ item, idx, replaceImage }: ItemProps) => {
  const y = useMotionValue(0);
  const dragControls = useDragControls();
  return (
    <Reorder.Item
      value={item}
      className="flex justify-between items-center bg-zinc-100  border border-zinc-300 rounded-lg p-4 text-white select-none relative  "
      style={{ y }}
      dragListener={false}
      dragControls={dragControls}
    >
      <div className="flex space-x-2 items-center">
        <PhotographIcon className="h-6 text-zinc-500" />
        <p className="text-sm truncate max-w-[100px] text-zinc-800">
          {item.name}
        </p>
      </div>

      <div className="flex space-x-2 items-center">
        <label htmlFor={item.id + "file-input"}>
          <Tooltip label="Replace">
            <UploadIcon className="h-5 w-5 text-zinc-500 cursor-pointer hover:text-zinc-200 transition-all" />
          </Tooltip>
        </label>
        <input
          onChange={(e) => replaceImage(e, idx, item.id)}
          type="file"
          id={item.id + "file-input"}
          className=" hidden"
        />
        {/* 
        <button onClick={() => removeImage(item.id)}>
          <Tooltip label="Remove">
            <XIcon className="h-5 text-zinc-400 hover:text-zinc-200 transition-all" />
          </Tooltip>
        </button> */}
{/* 
        <div className="cursor-grab active:cursor-grabbing">
          <Tooltip label="Move">
            <svg
              className="h-5 text-zinc-400 hover:text-zinc-200 transition-all active:text-zinc-200"
              stroke="currentColor"
              fill="currentColor"
              onPointerDown={(event) => dragControls.start(event)}
              viewBox="0 0 24 24"
            >
              <path d="M15,5 L17,5 L17,3 L15,3 L15,5 Z M7,5 L9,5 L9,3 L7,3 L7,5 Z M15,13 L17,13 L17,11 L15,11 L15,13 Z M7,13 L9,13 L9,11 L7,11 L7,13 Z M15,21 L17,21 L17,19 L15,19 L15,21 Z M7,21 L9,21 L9,19 L7,19 L7,21 Z"></path>
            </svg>
          </Tooltip>
        </div> */}
      </div>
    </Reorder.Item>
  );
};
