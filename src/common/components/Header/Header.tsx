import { useMemo, useState } from "react";
import { NextPage } from "next";
import { Disclosure } from "@headlessui/react";
import {
  MenuIcon,
  XIcon,
  PencilIcon,
  HomeIcon,
  ViewGridIcon,
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
  { name: "projects", href: "/", icon: ViewGridIcon },
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
          <div className="   ">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-between flex-1 ">
                <div className="flex  items-center space-x-5">
                  <Link href="/">
                    <span className="flex items-end justify-center space-x-2   ">
                      <Image
                        className="h-7 w-auto ml-2 sm:m-0"
                        src={logo_light}
                        alt="logo"
                      />
                    </span>
                  </Link>

                  <ul className="sm:flex hidden ">
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
                <div className="flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-black  hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-600">
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
            <Disclosure.Panel className="sm:hidden absolute z-50  mt-3 w-screen">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-sky-100 ">
                {pages.map((item, index) => (
                  <Link key={index} href={item.href}>
                    <button
                      onClick={() => close()}
                      key={item.name}
                      className={clsx(
                        item.href === active
                          ? "bg-white text-sky-600  "
                          : "text-gray-300  ",
                        " flex items-center  p-3 rounded-lg border border-transparent text-center transition-all   w-full space-x-2"
                      )}
                    >
                      <item.icon
                        className="h-6 w-6 flex-shrink-0 transition-colors  "
                        aria-hidden="true"
                      />
                      <span
                        className={clsx(
                          item.href === active ? "text-sky-500" : "text-white",
                          "capitalize"
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
