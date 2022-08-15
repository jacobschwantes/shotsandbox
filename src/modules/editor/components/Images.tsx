import { NextPageContext, NextComponentType } from "next";
import { CameraIcon, UploadIcon } from "@heroicons/react/outline";
interface ImagesProps {
  addImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalOpen: boolean;
}
const Images: NextComponentType<NextPageContext, {}, ImagesProps> = ({
  addImage,
  setModalOpen,
  modalOpen
}) => (
  <>
    <div className=" space-y-2">
      <button
        onClick={() => setModalOpen(!modalOpen)}
        className="w-full flex items-center justify-center space-x-3 border border-zinc-800 text-zinc-200 bg-zinc-900 hover:bg-zinc-800 bg-opacity-25 hover:bg-opacity-25 transition-all cursor-pointer bg py-2 rounded-lg"
      >
        <CameraIcon className="h-5 w-5" />
        <span className="font-medium text-base">Screenshot</span>
      </button>
      <div className="">
        <label
          htmlFor="file-input"
          className="flex items-center justify-center space-x-3 border border-blue-600 text-blue-500 bg-blue-900 bg-opacity-25 hover:bg-opacity-30 transition-all cursor-pointer bg py-2 rounded-lg"
        >
          <UploadIcon className="h-5 w-5" />
          <span className="font-medium text-base">Upload</span>
        </label>
        <input
          onChange={addImage}
          type="file"
          id={"file-input"}
          className=" hidden"
        />
      </div>
    </div>
  </>
);
export default Images;
