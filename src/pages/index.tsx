import type { NextPage } from "next";
import Head from "next/head";
import { Modal, Tabs } from "@components/index";
import {
  ChartBarIcon,
  KeyIcon,
  ArchiveIcon,
  CogIcon,
  FolderAddIcon,
  FolderIcon,
  DocumentAddIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { DotsHorizontalIcon, PlusIcon } from "@heroicons/react/solid";
import clsx from "clsx";
const Home: NextPage = ({ idToken }) => {
  const [selected, setSelected] = useState("projects");
  const [open, setOpen] = useState(false);
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

  const projects = [
    { name: "Best project ever", date: 1673058531000 },
    { name: "Best project ever 2", date: 1673058531000 },
  ];
  const folders = [{ name: "Best folder ever", date: 1673058531000 }];
  return (
    <>
      <Head>
        <title>screenshotify | editor</title>
      </Head>
      <div className="p-6 bg-zinc-50 min-h-screen ">
        <Modal heading="Add folder" open={open} setOpen={setOpen}>
          <div className="space-y-2">
            <h1 className="font-medium text-zinc-900 ">Name</h1>
            <input
              // value={tokenOptions.name}
              // onChange={(e) => {
              //   setError("");
              // }}
              type="text"
              className={clsx(
                "form-input text-sm p-3 sm:w-1/2 w-full font-medium rounded-lg focus:outline-none bg-white text-zinc-600 border-zinc-300 border transition-colors",
                false ? "border-red-500" : "hover:border-blue-500"
              )}
            />
            <p className="text-red-500 font-medium text-sm">{false}</p>
          </div>
        </Modal>
        <div className="flex justify-between">
          <div className=" w-full">
            <Tabs
              className=""
              tabs={["projects", "settings", "assets"]}
              selected={selected}
              setSelected={setSelected}
            >
              {(() => {
                switch (selected) {
                  case "projects":
                    return (
                      <div className="py-5 space-y-10 w-full">
                        <div className=" space-y-5 ">
                          <h1 className="font-medium text-lg">
                            Folders{" "}
                            <span className="text-zinc-500">
                              ∙ {folders.length}
                            </span>
                          </h1>
                          <div className="grid grid-cols-3 xl:grid-cols-6 gap-6">
                            {folders.map((item) => (
                              <div className=" border rounded-xl space-y-3 p-5 bg-white min-h-[125px] flex flex-col justify-between">
                                <div className="flex justify-between text-zinc-400">
                                  <FolderIcon className="h-7" />
                                  <DotsHorizontalIcon className="h-7" />
                                </div>
                                <h2 className="font-medium text-zinc-700 whitespace-nowrap truncate">
                                  {item.name}
                                </h2>
                              </div>
                            ))}
                            <div className="border rounded-xl space-x-3 p-5 bg-white min-h-[125px] flex  items-center justify-center  hover:border-zinc-400 transition-all duration-300 cursor-pointer">
                              <span className="bg-zinc-100 rounded-full p-2 flex items-center justify-center">
                                <PlusIcon className="h-5 text-zinc-500" />
                              </span>
                              <h1 className="font-medium text-zinc-700 text-xl whitespace-nowrap truncate">
                                New Folder
                              </h1>
                            </div>
                          </div>
                        </div>
                        <div className=" w-full space-y-5 ">
                          <h1 className="font-medium text-lg">
                            Projects{" "}
                            <span className="text-zinc-500">
                              ∙ {projects.length}
                            </span>
                          </h1>
                          <div className="grid grid-cols-3 xl:grid-cols-6  gap-6 w-full">
                            {projects.map((item) => (
                              <div className=" border rounded-xl overflow-hidden  bg-white min-h-[150px] flex flex-col aspect-square group relative">
                                <div className="absolute group-hover:flex hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-lg flex-col space-y-1 min-w-[50%] border border-zinc-300 shadow-xl">
                                  <Link href="/editor">
                                    <button className=" hover:bg-zinc-100 rounded-lg font-medium text-zinc-800 py-2 px-3 w-full text-center duration-200 transition-all">
                                      Open
                                    </button>
                                  </Link>
                                  <button className=" hover:bg-zinc-100 rounded-lg font-medium text-zinc-800 py-2 px-3 w-full text-center duration-200 transition-all">
                                    Duplicate
                                  </button>
                                </div>
                                <div className=" min-h-[150px] flex flex-col group-hover:blur-sm group-hover:brightness-90 duration-300 transition-all">
                                  <img
                                    className="object-cover h-2/3"
                                    src="preset_5.png"
                                  />
                                  <div className="px-5 flex flex-col justify-between flex-1 py-4">
                                    <h2 className="font-medium text-zinc-700 whitespace-nowrap truncate">
                                      {item.name}
                                    </h2>
                                    <p className="text-sm">
                                      {new Date(item.date).toLocaleDateString(
                                        "en-US",
                                        {
                                          year: "numeric",
                                          month: "short",
                                          day: "numeric",
                                        }
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}

                            <div className="border rounded-xl space-x-3 p-5 bg-white min-h-[125px] flex  items-center justify-center  hover:border-zinc-400 transition-all duration-300 cursor-pointer">
                              <span className="bg-zinc-100 rounded-full p-2 flex items-center justify-center">
                                <PlusIcon className="h-5 text-zinc-500" />
                              </span>
                              <h1 className="font-medium text-zinc-700 text-xl whitespace-nowrap truncate">
                                New Project
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    );

                  default:
                    return <></>;
                }
              })()}
            </Tabs>
          </div>
          <div className="flex items-start space-x-2">
            <button
              onClick={() => setOpen(true)}
              className=" whitespace-nowrap inline-flex items-center px-4 py-2 border  rounded-md shadow-sm text-sm font-medium text-black  bg-white hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:ring-offset-black transition-all duration-300"
            >
              <FolderAddIcon className="h-5 w-5 sm:mr-1" />
              <span className="hidden sm:block">Add folder</span>
            </button>

            <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:ring-offset-black transition-all duration-300 ">
              <DocumentAddIcon className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:block">Project</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
