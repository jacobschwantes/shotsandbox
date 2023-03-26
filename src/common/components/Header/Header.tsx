import { useMemo, useState } from "react";
import { NextPage } from "next";
import { Disclosure } from "@headlessui/react";
import {
  MenuIcon,
  XIcon,
  PencilIcon,
  HomeIcon,
  ViewGridAddIcon,
  AdjustmentsIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";
import logo from "@public/logo.png";
import logo_short from "@public/logo_short.png";
import logo_light from "@public/logo_light.png";
import Image from "next/future/image";
import { motion } from "framer-motion";
interface HeaderProps {}
const pages = [
  { name: "projects", href: "/", icon: ViewGridAddIcon },
  { name: "settings", href: "/settings", icon: AdjustmentsIcon },
];
const Header: NextPage<HeaderProps> = ({}) => {
  const router = useRouter();
  const active = useMemo(() => {
    return router.asPath;
  }, [router]);
  const navigation = [
    {
      name: "Home",
      href: "/",
      icon: HomeIcon,
      current: router.asPath === "/",
    },
  ];
  return (
    <Disclosure as="nav" className="bg-white z-30 border-b py-3">
      {({ open, close }) => (
        <>
          <div className=" px-2 sm:px-6 lg:px-6 ">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-between sm:flex-1 ">
                <div className="flex  items-center space-x-5">
                  <Link href="/">
                    <span className="flex items-end justify-center space-x-2 dark:text-white  ">
                      <Image
                        className=" h-7 hidden sm:block w-auto  "
                        src={logo_light}
                        alt="logo"
                      />
                      <Image
                        className="h-8 sm:hidden w-auto "
                        src={logo_short}
                        alt="logo"
                      />
                      <Image
                        className=" h-7 hidden dark:sm:block w-auto   "
                        src={logo}
                        alt="logo"
                      />
                      <Image
                        className="h-8 w-auto hidden dark:sm:block"
                        src={logo_short}
                        alt="logo"
                      />

                      {/* <h1 className="text-2xl hidden sm:block">screenshotify</h1> */}
                    </span>
                  </Link>

                  <ul className={clsx("flex ")}>
                    {pages.map((tab, index) => (
                      <motion.li className="relative" key={tab.name}>
                        <Link href={tab.href}>
                          <a
                            className={clsx(
                              "flex items-center justify-center px-4 py-3 rounded-lg text-center font-medium capitalize leading-5 transition-all duration-300 select-none outline-none ",
                              tab.href === active
                                ? "bg-zinc-100 text-zinc-800    "
                                : "text-gray-500 hover:text-gray-800"
                            )}
                          >
                            <tab.icon
                              className={clsx(
                                tab.href === active && "text-sky-500",
                                "h-5 mr-1.5"
                              )}
                            />{" "}
                            <h1 className="">{tab.name}</h1>
                          </a>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                {/* <Link href="/editor">
                      <a className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:ring-offset-black">
                        Editor
                        <ArrowRightIcon className="h-5 w-5 ml-1" />
                      </a>
                    </Link> */}

                <div className="sm:hidden">
                  <Link href="/editor">
                    <a className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:ring-offset-black">
                      Open Editor
                      <PencilIcon className="h-4 ml-1" />
                    </a>
                  </Link>
                </div>
                <div className="flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-black dark:text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-600">
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
                          ? "bg-sky-200 text-sky-600 dark:bg-sky-900 dark:text-sky-600 dark:bg-opacity-30   "
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
                          item.current ? "text-sky-500" : "text-white"
                        )}
                      >
                        {item.name}
                      </span>
                    </button>
                  </Link>
                ))}
                <div className="flex w-full space-x-3 p-2"></div>
              </div>
            </Disclosure.Panel>
          </div>
        </>
      )}
    </Disclosure>
  );
};
export default Header;
