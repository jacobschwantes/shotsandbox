import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {Notifications} from "@components/index"
import {
  BellIcon,
  BookOpenIcon,
  ChipIcon,
  CreditCardIcon,
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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  return (
    <Disclosure as="nav" className="bg-white shadow-sm z-10">
      {({ open }) => (
        <>
          <div className=" px-2 sm:px-6 lg:px-6 ">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center justify-between flex-1">
                <Link href="/">
                  <span className="hidden lg:flex  items-center justify-center space-x-2 ">
                    <img className=" h-7 mt-1.5 " src="logo.svg" alt="logo" />
                    <h1 className="text-2xl">screenshotify</h1>
                  </span>
                </Link>
                <div className="hidden sm:block">
                  <div className="flex space-x-4">
                    <Notifications/>
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
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
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
