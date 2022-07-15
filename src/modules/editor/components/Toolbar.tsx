import { NextComponentType, NextPageContext } from "next";
interface ToolbarProps {
  type: "light" | "dark";
}

const Toolbar: NextComponentType<NextPageContext, {}, ToolbarProps> = ({
  type,
}) => {
  switch (type) {
    case "light":
      return (
        <div className=" w-full rounded-t-lg bg-gray-200">
          <div className="flex space-x-3 p-1.5 ">
            <span className="p-1.5 bg-red-500 rounded-full"></span>
            <span className="p-1.5 bg-yellow-500 rounded-full"></span>
            <span className="p-1.5 bg-green-500 rounded-full"></span>
          </div>
        </div>
      );
    case "dark":
      return (
        <div className=" w-full rounded-t-lg bg-gray-600">
          <div className="flex space-x-3 p-1.5 ">
            <span className="p-1.5 bg-red-500 rounded-full"></span>
            <span className="p-1.5 bg-yellow-500 rounded-full"></span>
            <span className="p-1.5 bg-green-500 rounded-full"></span>
          </div>
        </div>
      );
    default:
      return (
        <div className=" w-full rounded-t-lg bg-gray-200">
          <div className="flex space-x-3 p-1.5 ">
            <span className="p-1.5 bg-red-500 rounded-full"></span>
            <span className="p-1.5 bg-yellow-500 rounded-full"></span>
            <span className="p-1.5 bg-green-500 rounded-full"></span>
          </div>
        </div>
      );
  }
};

export default Toolbar;
