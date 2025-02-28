import { useMemo } from "react";
import { NextPage } from "next";
import { Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  Squares2X2Icon,
  AdjustmentsVerticalIcon,
  BugAntIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Link from "next/link";
import clsx from "clsx";
import logo_light from "@public/logo_light.png";
import Image from "next/future/image";
import { motion } from "framer-motion";
import { Popover } from "..";
interface HeaderProps {}
const pages = [
  { name: "projects", href: "/", icon: Squares2X2Icon },
  { name: "settings", href: "/settings", icon: AdjustmentsVerticalIcon },
];
const Header: NextPage<HeaderProps> = () => {
  const router = useRouter();
  const active = useMemo(() => {
    return router.asPath;
  }, [router]);
  return (
    <Disclosure as="nav" className="bg-white z-50 border-b py-3 sm:px-6">
      {({ open, close }) => (
        <>
          <div className="   ">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-between flex-1 ">
                <div className="flex  items-center space-x-5">
                  <Link href="/">
                    <span className="flex items-end justify-center space-x-2   ">
                      <Image
                        loading="eager"
                        priority
                        className="h-8 w-auto ml-2 sm:m-0"
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
                {/* <Popover
                  render={() => (
                    <div className="">
                      find a bug?
                    </div>
                  )}
                >
                  <BugAntIcon className="h-5" />
                </Popover> */}
                <div className="flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500 mr-2">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="sm:hidden absolute z-50 mt-3 w-screen">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-sky-100 ">
                {pages.map((item, index) => (
                  <Link key={index} href={item.href}>
                    <button
                      onClick={() => close()}
                      key={item.name}
                      className={clsx(
                        item.href === active
                          ? "bg-white text-sky-500  "
                          : "text-sky-900  ",
                        " flex items-center p-3 rounded-lg border border-transparent text-center  w-full space-x-2"
                      )}
                    >
                      <item.icon
                        className="h-6 w-6 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span
                        className={clsx(
                          item.href === active
                            ? "text-zinc-700"
                            : "text-sky-900",
                          "capitalize font-medium"
                        )}
                      >
                        {item.name}
                      </span>
                    </button>
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </div>
        </>
      )}
    </Disclosure>
  );
};
export default Header;
