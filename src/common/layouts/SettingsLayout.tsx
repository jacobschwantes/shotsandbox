import { NextPage } from "next";
import Link from "next/link";
import clsx from "clsx";
import {
  UserIcon,
  CreditCardIcon,
  AdjustmentsIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface SettingsLayoutProps {
  children: ReactNode
}
const SettingsLayout: NextPage<SettingsLayoutProps> = ({ children }) => {
  const router = useRouter();
  const tabs = [
    {
      name: "Account",
      href: "/settings/account",
      icon: UserIcon,
      current: router.asPath.includes("settings/account"),
    },
    {
      name: "Billing",
      href: "/settings/billing",
      icon: CreditCardIcon,
      current: router.asPath.includes("settings/billing"),
    },
    {
      name: "Preferences",
      href: "/settings/preferences",
      icon: AdjustmentsIcon,
      current: router.asPath.includes("settings/preferences"),
    },
  ];

  return (
    <div className="space-y-4 ">
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between w-full">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Settings</h3>
      </div>
      <div className="flex space-x-2 rounded-xl bg-gray-100 p-1 max-w-4xl ">
        {tabs.map((tab) => {
          return (
            <Link key={tab.name} href={tab.href}>
              <a
                key={tab.name}
                className={clsx(
                  "flex w-full items-center justify-center rounded-lg py-2.5 text-center text-sm font-medium capitalize leading-5 ",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  tab.current
                    ? "bg-white text-blue-700 shadow"
                    : "text-gray-700 hover:bg-white/[0.12] hover:text-gray-600"
                )}
              >
                <h1 className="hidden sm:block">{tab.name}</h1>
                <tab.icon className="h-5 sm:hidden" />
              </a>
            </Link>
          );
        })}
      </div>
      <div className="rounded-xl bg-white">{children}</div>
    </div>
  );
};
export default SettingsLayout



