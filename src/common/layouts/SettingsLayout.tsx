import { NextPage } from "next";
import Link from "next/link";
import { Header, Navigation } from "@components/index";

import { Dialog } from "@headlessui/react";
import {
  BriefcaseIcon,
  ChatIcon,
  DocumentSearchIcon,
  HomeIcon,
  MenuAlt2Icon,
  UsersIcon,
} from "@heroicons/react/outline";
import clsx from "clsx";
import {
  BookOpenIcon,
  ChipIcon,
  CreditCardIcon,
  DownloadIcon,
  MenuIcon,
  XIcon,
  CogIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
const navigation = [
  { name: "Pricing", href: "/pricing", icon: CreditCardIcon },
  { name: "Download", href: "/download", icon: DownloadIcon },
  { name: "Docs", href: "#", icon: BookOpenIcon },
  { name: "App", href: "#", icon: ChipIcon },
];

const SettingsLayout: NextPage = ({ children }) => {
  const router = useRouter();
  const tabs = [
    {
      name: "General",
      href: "/settings",
      current: router.asPath.endsWith("/settings"),
    },
    {
      name: "Password",
      href: "/settings/password",
      current: router.asPath.includes("password"),
    },
    {
      name: "Notifications",
      href: "/settings/notifications",
      current: router.asPath.includes("notifications"),
    },
    {
      name: "Plan",
      href: "/settings/plan",
      current: router.asPath.includes("plan"),
    },
    {
      name: "Billing",
      href: "/settings/billing",
      current: router.asPath.includes("billing"),
    },
    {
      name: "Team Members",
      href: "/settings/team",
      current: router.asPath.includes("team"),
    },
  ];

  return (
    <div className=" flex flex-col md:px-8 xl:px-0 w-full">
      <main className="flex-1">
        <div className="relative  mx-auto md:px-8 xl:px-0">
          <div className=" ">
            <div className="px-4 sm:px-6 md:px-0">
              <h1 className="text-3xl font-extrabold text-gray-900">
                Settings
              </h1>
            </div>
            <div className="px-4 sm:px-6 md:px-0">
              <div className="py-3">
                {/* Tabs */}
                <div className="lg:hidden">
                  <label htmlFor="selected-tab" className="sr-only">
                    Select a tab
                  </label>
                  <select
                    id="selected-tab"
                    name="selected-tab"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    defaultValue={tabs.find((tab) => tab.current).name}
                  >
                    {tabs.map((tab) => (
                      <option key={tab.name}>{tab.name}</option>
                    ))}
                  </select>
                </div>
                <div className="hidden lg:block">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                      {tabs.map((tab) => (
                        <Link
                          key={tab.name}
                          href={tab.href}
                          
                        >
                            <a  className={clsx(
                            tab.current
                              ? "border-blue-500 text-blue-600"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                            "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                          )}>

                           
                          {tab.name} </a>
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>

                {children}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SettingsLayout;
