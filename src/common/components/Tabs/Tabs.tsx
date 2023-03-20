import { NextPageContext, NextComponentType } from "next";
import clsx from "clsx";
interface TabsProps {
  selected: string;
  setSelected: (id: any) => void;
  tabs: string[];
  children?: React.ReactNode;
  className?: string;
}
const Tabs: NextComponentType<NextPageContext, {}, TabsProps> = ({
  tabs,
  children,
  selected,
  setSelected,
  className
}) => (
  <div>
    <div className={clsx("flex space-x-2 rounded-xl bg-gray-100 dark:bg-black dark:border dark:border-zinc-900 p-1 max-w-xl ", className)}>
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => setSelected(tab)}
          className={clsx(
            "flex w-full items-center justify-center rounded-lg py-2.5 text-center text-sm font-medium capitalize leading-5 transition-all duration-300 select-none ",
            "ring-sky-600  ring-offset-2 focus:outline-none dark:ring-offset-black focus:ring-2",
            tab === selected
              ? "bg-white text-sky-700 dark:text-sky-500 shadow dark:bg-sky-900 dark:bg-opacity-30  "
              : "text-gray-700 hover:text-gray-600 dark:hover:text-zinc-200 dark:text-zinc-300"
          )}
        >
          <h1 className="">{tab}</h1>
        </button>
      ))}
    </div>
    {children}
  </div>
);
export default Tabs;
