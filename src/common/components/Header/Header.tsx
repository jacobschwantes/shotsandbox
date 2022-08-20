import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Notifications } from "@components/index";
import {
  ArrowRightIcon,
  BellIcon,
  BookOpenIcon,
  ChipIcon,
  DownloadIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/outline";
const navigation = [
  { name: "Pricing", href: "/pricing", icon: BellIcon },
  { name: "Download", href: "/download", icon: DownloadIcon },
  { name: "Docs", href: "#", icon: BookOpenIcon },
  { name: "App", href: "#", icon: ChipIcon },
];
import Link from "next/link";
import clsx from "clsx";

export default function Header() {
  return (
    <Disclosure
      as="nav"
      className="bg-white shadow-sm z-30 dark:bg-black dark:border-b dark:border-zinc-900"
    >
      {({ open }) => (
        <>
          <div className="px-2">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center justify-between flex-1">
                <Link href="/">
                  <span className="hidden lg:flex items-end justify-center space-x-2 dark:text-white ">
                    <img
                      className=" h-7 mt-1.5 dark:bg-zinc-200 rounded-md p-0.5 "
                      src="logo.svg"
                      alt="logo"
                    />
                    <h1 className="text-2xl">screenshotify</h1>
                  </span>
                </Link>
                <div className="hidden sm:block">
                  <div className="flex space-x-4 z-20 items-center">
                    <Notifications />
                    <Link href="/editor">
                      <a className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:ring-offset-black">
                        Editor
                        <ArrowRightIcon className="h-5 w-5 ml-1" />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={clsx(
                    "block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white "
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
