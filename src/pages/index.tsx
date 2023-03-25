import type { NextPage } from "next";
import Head from "next/head";
import { Modal, Tabs } from "@components/index";
import { motion } from "framer-motion";
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
import {
  DotsHorizontalIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import clsx from "clsx";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "src/db";
import { duplicate, insertFolder } from "src/db/utils/insert";
import { deleteDb, deleteProject } from "src/db/utils/delete";
import { AnimatePresence } from "framer-motion";
const Home: NextPage = () => {
  const [selected, setSelected] = useState("projects");
  const folders = useLiveQuery(() => db.folders.toArray(), [], false);
  const projects = useLiveQuery(() => db.projects.toArray(), [], false);
  const [folderInput, setFolderInput] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(0);
  const [openFolder, setOpenFolder] = useState(false);
  const [openProject, setOpenProject] = useState(false);

  return (
    <>
      <Head>
        <title>ShotSandbox - Dashboard</title>
      </Head>
      <div className="p-6 bg-zinc-50 min-h-screen ">
        <Modal
          callback={() => {
            insertFolder(folderInput);
            setFolderInput("");
            setOpenFolder(false);
          }}
          heading="Add folder"
          open={openFolder}
          setOpen={setOpenFolder}
        >
          <div className="space-y-2">
            <h1 className="font-medium text-zinc-900 ">Name</h1>
            <input
              value={folderInput}
              onChange={(e) => {
                setFolderInput(e.target.value);
              }}
              type="text"
              className={clsx(
                "form-input text-sm p-3 sm:w-1/2 w-full font-medium rounded-lg focus:outline-none bg-white text-zinc-600 border-zinc-300 border transition-colors",
                false ? "border-red-500" : "hover:border-sky-500"
              )}
            />
            <p className="text-red-500 font-medium text-sm">{false}</p>
          </div>
        </Modal>
        <Modal
          heading="Add project"
          open={openProject}
          setOpen={setOpenProject}
        >
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
                false ? "border-red-500" : "hover:border-sky-500"
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
                              ∙ {folders && folders.length}
                            </span>
                          </h1>
                          <div className="grid grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 gap-6">
                            {folders &&
                              folders?.map((item, idx) => (
                                <button
                                  key={item.id}
                                  onClick={() => setSelectedFolder(idx)}
                                  className={clsx(
                                    "border rounded-xl space-y-3 p-5 bg-white min-h-[125px] flex flex-col justify-between",
                                    idx === selectedFolder
                                      ? "border-sky-500 border-2"
                                      : ""
                                  )}
                                >
                                  <div className="flex justify-between text-zinc-400">
                                    <FolderIcon className="h-7" />
                                    <DotsHorizontalIcon className="h-7" />
                                  </div>
                                  <h2 className="font-medium text-zinc-700 whitespace-nowrap truncate">
                                    {item.name}
                                  </h2>
                                </button>
                              ))}
                            <button
                              onClick={() => setOpenFolder(true)}
                              className="border rounded-xl space-x-3 p-5 bg-white min-h-[125px] flex  items-center justify-center  hover:border-zinc-400 transition-all duration-300 cursor-pointer"
                            >
                              <span className="bg-zinc-100 rounded-full p-2 flex items-center justify-center">
                                <PlusIcon className="h-5 text-zinc-500" />
                              </span>
                              <h1 className="font-medium text-zinc-700 text-xl whitespace-nowrap truncate">
                                New Folder
                              </h1>
                            </button>
                          </div>
                        </div>
                        <div className=" w-full space-y-5 ">
                          <h1 className="font-medium text-lg">
                            Projects{" "}
                            <span className="text-zinc-500">
                              ∙{" "}
                              {folders &&
                                folders[selectedFolder]?.projects?.length}
                            </span>
                          </h1>
                          <motion.ul className="grid grid-cols-3 lg:grid-cols-3 2xl:grid-cols-6  gap-6 w-full">
                            {folders && (
                              <AnimatePresence initial={false} mode="sync">
                                {projects &&
                                  projects.map(
                                    (item, idx) =>
                                      item.id &&
                                      folders[selectedFolder].projects.includes(
                                        item.id
                                      ) && (
                                        <motion.li
                                          layout
                                          initial={{ scale: 0.8, opacity: 0 }}
                                          animate={{ scale: 1, opacity: 1 }}
                                          exit={{ scale: 0.8, opacity: 0 }}
                                          transition={{
                                            ease: "easeInOut",
                                          }}
                                          key={`${item.id}`}
                                          className=" border rounded-xl overflow-hidden  bg-white min-h-[150px] flex flex-col aspect-square group relative"
                                        >
                                          <div className="absolute group-hover:flex hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-lg flex-col space-y-1 min-w-[50%] border border-zinc-300 shadow-xl">
                                            <Link href={`/editor/${item.id}`}>
                                              <button className=" hover:bg-zinc-100 rounded-lg font-medium text-zinc-800 py-2 px-3 w-full text-center duration-200 transition-all">
                                                Open
                                              </button>
                                            </Link>
                                            <button
                                              onClick={() =>
                                                folders &&
                                                duplicate(
                                                  folders[selectedFolder].id,
                                                  item,
                                                  `${item.name} Duplicate`
                                                )
                                              }
                                              className=" hover:bg-zinc-100 rounded-lg font-medium text-zinc-800 py-2 px-3 w-full text-center duration-200 transition-all"
                                            >
                                              Duplicate
                                            </button>
                                            <button
                                              onClick={() =>
                                                deleteProject(
                                                  folders[selectedFolder].id,
                                                  item.id
                                                )
                                              }
                                              className=" hover:bg-zinc-100 rounded-lg font-medium text-zinc-800 py-2 px-3 w-full text-center duration-200 transition-all"
                                            >
                                              Delete
                                            </button>
                                          </div>
                                          <div className=" min-h-[150px] flex flex-col group-hover:blur-sm group-hover:brightness-90 duration-300 transition-all">
                                            <img
                                              className="object-cover h-2/3"
                                              src={
                                                typeof item.preview === "string"
                                                  ? item.preview
                                                  : URL.createObjectURL(
                                                      item.preview
                                                    )
                                              }
                                            />
                                            <div className="px-5 flex flex-col justify-between flex-1 py-4">
                                              <h2 className="font-medium text-zinc-700 whitespace-nowrap truncate">
                                                {item.name}
                                              </h2>
                                              <p className="text-sm">
                                                {new Date(
                                                  item.date
                                                ).toLocaleDateString("en-US", {
                                                  year: "numeric",
                                                  month: "short",
                                                  day: "numeric",
                                                })}
                                              </p>
                                            </div>
                                          </div>
                                        </motion.li>
                                      )
                                  )}

                                {projects && (
                                  <motion.li
                                    layout
                                    transition={{ ease: "easeInOut" }}
                                    key={"0"}
                                    className="relative group border rounded-xl space-x-3 p-5 bg-white hover:bg-zinc-100 flex  items-center justify-center transition-colors duration-300 cursor-pointer aspect-square"
                                  >
                                    <div className="absolute group-hover:flex hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-lg flex-col space-y-1 min-w-[50%] border border-zinc-300 shadow-xl">
                                      <Link href="/editor">
                                        <button className=" hover:bg-zinc-100 rounded-lg font-medium text-zinc-800 py-2 px-3 w-full text-center duration-200 transition-all">
                                          Blank
                                        </button>
                                      </Link>
                                      <button className=" hover:bg-zinc-100 rounded-lg font-medium text-zinc-800 py-2 px-3 w-full text-center duration-200 transition-all">
                                        Template
                                      </button>
                                    </div>
                                    <span className="bg-zinc-100 rounded-full p-2 flex items-center justify-center">
                                      <PlusIcon className="h-5 text-zinc-500" />
                                    </span>
                                    <h1 className="font-medium text-zinc-700 text-xl whitespace-nowrap truncate">
                                      New Project
                                    </h1>
                                  </motion.li>
                                )}
                              </AnimatePresence>
                            )}
                          </motion.ul>
                        </div>
                      </div>
                    );
                  case "settings":
                    return (
                      <div className="py-5">
                        <button
                          onClick={() => deleteDb()}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:ring-offset-black transition-all duration-300 "
                        >
                          <TrashIcon className="h-4 w-4 sm:mr-1" />
                          <span className="hidden sm:block">Clear DB</span>
                        </button>
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
              onClick={() => setOpenFolder(true)}
              className=" whitespace-nowrap inline-flex items-center px-4 py-2 border  rounded-md shadow-sm text-sm font-medium text-black  bg-white hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:ring-offset-black transition-all duration-300"
            >
              <FolderAddIcon className="h-5 w-5 sm:mr-1" />
              <span className="hidden sm:block">Add folder</span>
            </button>

            <button
              onClick={() => setOpenProject(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:ring-offset-black transition-all duration-300 "
            >
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
