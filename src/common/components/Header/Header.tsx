import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Notifications } from "@components/index";
import {
  ArrowRightIcon,
  BellIcon,
  BookOpenIcon,
  ChipIcon,
  DownloadIcon,
  ChartBarIcon,
  KeyIcon,
  ArchiveIcon,
  CogIcon,
  MenuIcon,
  XIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";
import logo from "../../../../public/logo.png";
import logo_short from "../../../../public/logo_short.png";
import Image from "next/future/image";
import { signOut, getAuth } from "firebase/auth";
import { firebaseApp } from "@modules/auth/firebase/client";
const auth = getAuth(firebaseApp);
export default function Header() {
  const router = useRouter();
  const navigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: ChartBarIcon,
      current: router.asPath === "/",
    },
    {
      name: "Tokens",
      href: "/tokens",
      icon: KeyIcon,
      current: router.asPath.includes("tokens"),
    },
    {
      name: "History",
      href: "/history",
      icon: ArchiveIcon,
      current: router.asPath.includes("history"),
    },
    {
      name: "Settings",
      href: "/settings/account",
      icon: CogIcon,
      current: router.asPath.includes("settings"),
    },
  ];
  return (
    <Disclosure
      as="nav"
      className="bg-white shadow-sm z-30 dark:bg-black dark:border-b dark:border-zinc-900"
    >
      {({ open, close }) => (
        <>
          <div className=" px-2 sm:px-6 lg:px-6 ">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center justify-between sm:flex-1 ">
                <Link href="/">
                  <span className="flex items-end justify-center space-x-2 dark:text-white  ">
                    <Image
                      className=" h-7 hidden sm:block w-auto  "
                      src={logo}
                      alt="logo"
                    />
                    <Image
                      className="h-8 sm:hidden w-auto"
                      src={logo_short}
                      alt="logo"
                    />
                    {/* <h1 className="text-2xl hidden sm:block">screenshotify</h1> */}
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
              <div className="sm:hidden">
                <Link href="/editor">
                  <a className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:ring-offset-black">
                    Open Editor
                    <PencilIcon className="h-4 ml-1" />
                  </a>
                </Link>{" "}
              </div>
              <div className="flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-black dark:text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600">
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

          <Disclosure.Panel className="sm:hidden absolute z-10 bg-black w-screen">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item, index) => (
                <Link key={index} href={item.href}>
                  <button
                    onClick={() => close()}
                    key={item.name}
                    className={clsx(
                      item.current
                        ? "bg-blue-200 text-blue-600 dark:bg-blue-900 dark:text-blue-600 dark:bg-opacity-30   "
                        : "text-gray-300  ",
                      " flex items-center  p-3 rounded-lg border border-transparent text-center transition-all  hover:bg-gray-100 dark:hover:bg-zinc-900 dark:bg-opacity-50 w-full space-x-2"
                    )}
                  >
                    <item.icon
                      className={"h-6 w-6 flex-shrink-0 transition-colors "}
                      aria-hidden="true"
                    />
                    <span
                      className={clsx(
                        item.current ? "text-blue-500" : "text-white"
                      )}
                    >
                      {item.name}
                    </span>
                  </button>
                </Link>
              ))}
              <div className="flex w-full space-x-3 p-2">
                <Disclosure.Button
                  onClick={() => signOut(auth)}
                  className="block text-center w-full  rounded-md border border-transparent px-3 py-1.5  bg-blue-600 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
                >
                  Log out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
