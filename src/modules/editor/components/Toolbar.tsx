import clsx from "clsx";
import { NextComponentType, NextPageContext } from "next";
interface ToolbarProps {
  options: {
    show: boolean;
    dark: boolean;
    opacity: number;
    buttons: {
      show: boolean;
      dark: boolean;
      solid: boolean;
    };
    searchBar: {
      show: boolean;
    };
  };
}

const Toolbar: NextComponentType<NextPageContext, {}, ToolbarProps> = ({
  options: { dark, buttons, searchBar, opacity },
}) => {
  return (
    <div className="w-full absolute top-0 z-10">
      <div
        style={{ opacity }}
        className={clsx(
          dark ? "bg-zinc-700" : "bg-zinc-200 ",
          "relative w-full py-3 px-8"
        )}
      >
        {searchBar.show && (
          <div
            className={clsx(
              dark ? "bg-zinc-500" : "bg-zinc-400",
              "absolute w-2/5 inset-0 m-auto h-5 rounded-md"
            )}
          ></div>
        )}
        <div className="flex space-x-3">
          <span
            className={clsx(
              buttons.dark
                ? "bg-zinc-500  border-zinc-500"
                : "bg-red-500 border-red-500",
              !buttons.solid && "bg-transparent",
              "p-2 rounded-full border-2"
            )}
          ></span>
          <span
            className={clsx(
              buttons.dark
                ? "bg-zinc-500  border-zinc-500"
                : "bg-yellow-500 border-yellow-500",
              !buttons.solid && "bg-transparent",
              "p-2 rounded-full border-2"
            )}
          ></span>
          <span
            className={clsx(
              buttons.dark
                ? "bg-zinc-500  border-zinc-500"
                : "bg-green-500 border-green-500",
              !buttons.solid && "bg-transparent",
              "p-2 rounded-full border-2"
            )}
          ></span>
        </div>
      </div>
    </div>
  );
};
export const PreviewToolbar: NextComponentType<
  NextPageContext,
  {},
  ToolbarProps
> = ({ options: { dark, buttons, searchBar, opacity } }) => {
  return (
    <div className="w-full absolute  z-10 bg-transparent">
      <div
        style={{ opacity }}
        className={clsx(
          dark ? "bg-zinc-700" : "bg-zinc-200 ",
          "relative w-full py-1 px-2"
        )}
      >
        {searchBar.show && (
          <div
            className={clsx(searchBar.show && "hidden",
              dark ? "bg-zinc-500" : "bg-zinc-400",
              "absolute w-2/5 inset-0 m-auto h-1.5 rounded-md"
            )}
          ></div>
        )}
        <div className="flex space-x-1">
          <span
            className={clsx(
              buttons.dark
                ? "bg-zinc-500  border-zinc-500"
                : "bg-red-500 border-red-500",
              !buttons.solid && "bg-transparent",
              "p-1 rounded-full border"
            )}
          ></span>
          <span
            className={clsx(
              buttons.dark
                ? "bg-zinc-500  border-zinc-500"
                : "bg-yellow-500 border-yellow-500",
              !buttons.solid && "bg-transparent",
              "p-1 rounded-full border"
            )}
          ></span>
          <span
            className={clsx(
              buttons.dark
                ? "bg-zinc-500  border-zinc-500"
                : "bg-green-500 border-green-500",
              !buttons.solid && "bg-transparent",
              "p-1 rounded-full border"
            )}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
