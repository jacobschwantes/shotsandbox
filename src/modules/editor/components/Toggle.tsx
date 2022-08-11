import { Switch } from "@headlessui/react";
import clsx from "clsx";
import { NextComponentType, NextPageContext } from "next";
import React from "react";
interface ToggleProps {
  setEnabled: (value: boolean) => void;
  enabled: boolean;
  children: React.ReactNode;
}
const Toggle: NextComponentType<NextPageContext, {}, ToggleProps> = ({
  enabled,
  setEnabled,
  children,
}) => {
  return (
    <div className="flex items-start justify-between">
      {children}
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={clsx(
          enabled ? "bg-blue-600" : "bg-zinc-200 dark:bg-zinc-800",
          "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-zinc-900 focus:ring-blue-600"
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={clsx(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
          )}
        />
      </Switch>
    </div>
  );
};
export default Toggle;
