import type { NextPage } from "next";
import Head from "next/head";
import { Loader, Modal, Popover } from "@components/index";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FolderPlusIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "react";
import {
  EllipsisHorizontalIcon,
  EllipsisVerticalIcon,

  FolderIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "src/db";
import { duplicate, insertFolder, insertProject } from "src/db/utils/insert";
import { deleteDb, deleteFolder, deleteProject } from "src/db/utils/delete";
import { AnimatePresence } from "framer-motion";
import { modifyFolder, modifyProject } from "src/db/utils/modify";
import { defaultProject } from "@utils/configs";

const Home: NextPage = () => {
  const folders = useLiveQuery(() => db.folders.toArray(), [], false);
  const projects = useLiveQuery(() => db.projects.toArray(), [], false);
  const [folderName, setFolderName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(0);
  const [openFolder, setOpenFolder] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const [projectQuery, setProjectQuery] = useState("");
  const [showMoreFolder, setShowMoreFolders] = useState(false);
  const [editFolder, setEditFolder] = useState(false);
  const [editProject, setEditProject] = useState(0);
  const searchedProjects = useMemo(() => {
    if (projects) {
      return projects.filter((project) =>
        project.name.toLowerCase().includes(projectQuery)
      );
    } else return [];
  }, [projectQuery, projects]);

  const filteredProjects = useMemo(() => {
    if (projects && folders && folders[selectedFolder]) {
      return projects.filter((project) =>
        folders[selectedFolder].projects.includes(project.id as number)
      );
    } else return [];
  }, [projects, selectedFolder, folders]);

  useEffect(() => {
    typeof window !== "undefined" &&
      setSelectedFolder(parseInt(localStorage.getItem("lastFolder") || "0"));
  }, []);
  return (
    <>
      <Head>
        <title>Dashboard | ShotSandbox</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <Modal
        callback={() => {
          insertFolder(folderName);
          setFolderName("");
          setOpenFolder(false);
          setSelectedFolder((folders && folders.length++) || 0);
        }}
        heading="Add folder"
        open={openFolder}
        setOpen={setOpenFolder}
      >
        <div className="space-y-2">
          <h1 className="font-medium text-zinc-900">Name</h1>
          <input
            required
            value={folderName}
            onChange={(e) => {
              setFolderName(e.target.value);
            }}
            type="text"
            className="text-sm p-3 sm:w-1/2 w-full font-medium rounded-lg focus:outline-sky-500  bg-white text-zinc-600 border-zinc-300 border transition-colors "
          />
        </div>
      </Modal>
      <Modal
        callback={() => {
          if (folders && folders[selectedFolder]) {
            modifyFolder(folders[selectedFolder].id, { name: folderName });
          }
          setFolderName("");
          setEditFolder(false);
        }}
        heading="Edit folder"
        open={editFolder}
        setOpen={setEditFolder}
      >
        <div className="space-y-2">
          <h1 className="font-medium text-zinc-900 ">Name</h1>
          <input
            required
            value={folderName}
            onChange={(e) => {
              setFolderName(e.target.value);
            }}
            type="text"
            className="text-sm p-3 sm:w-1/2 w-full font-medium rounded-lg focus:outline-sky-500  bg-white text-zinc-600 border-zinc-300 border transition-colors "
          />
        </div>
      </Modal>
      <Modal
        callback={() => {
          if (projects) {
            modifyProject(editProject, { name: projectName });
          }
          setProjectName("");
          setEditProject(0);
        }}
        heading="Edit project"
        open={editProject === 0 ? false : true}
        setOpen={() => setEditProject(0)}
      >
        <div className="space-y-2">
          <h1 className="font-medium text-zinc-900 ">Name</h1>
          <input
            required
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
            }}
            type="text"
            className="text-sm p-3 sm:w-1/2 w-full font-medium rounded-lg focus:outline-sky-500  bg-white text-zinc-600 border-zinc-300 border transition-colors "
          />
        </div>
      </Modal>
      <Modal
        heading="Add project"
        open={openProject}
        setOpen={setOpenProject}
        callback={() => {
          if (folders && folders[selectedFolder]) {
            const newProject = { ...defaultProject };
            newProject.name = projectName;
            insertProject(newProject, folders[selectedFolder].id);
            setProjectName("");
            setEditProject(0);
            setOpenProject(false);
          }
        }}
      >
        <div className="space-y-2">
          <h1 className="font-medium text-zinc-900 ">Name</h1>
          <input
            required
            value={projectName}
            onChange={(e) => {
              setProjectName(e.target.value);
            }}
            type="text"
            className="text-sm p-3 sm:w-1/2 w-full font-medium rounded-lg focus:outline-sky-500  bg-white text-zinc-600 border-zinc-300 border transition-colors "
          />
        </div>
      </Modal>
      <div className="sm:px-6 px-3 bg-zinc-50 min-h-screen ">
        <div className="flex justify-between space-x-2 items-center pt-7">
          <div className="flex items-center space-x-2 rounded-lg border bg-white px-5 flex-1 max-w-lg">
            <MagnifyingGlassIcon className="h-5 text-zinc-500" />
            <input
              value={projectQuery}
              onChange={(e) => setProjectQuery(e.target.value)}
              type="text"
              placeholder="Search projects"
              className="h-[3.25rem] w-full border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm focus:outline-none"
            ></input>
          </div>
          <div className="flex items-start space-x-2 justify-self-end">
            <button
              onClick={() => {
                setFolderName("New folder");
                setOpenFolder(true);
              }}
              className=" whitespace-nowrap inline-flex items-center px-4 py-4 sm:py-3 border  rounded-lg text-sm font-medium text-black  bg-white hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500  transition-all duration-300"
            >
              <FolderPlusIcon className="h-5 w-5 sm:mr-1" />
              <span className="hidden sm:block">New Folder</span>
            </button>

            <button
              onClick={() => {
                setProjectName("New project");
                setOpenProject(true);
              }}
              className="inline-flex items-center px-4 py-4 sm:py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500  transition-all duration-300 "
            >
              <SquaresPlusIcon className="h-5 sm:h-4 w-5 sm:w-4 sm:mr-1" />
              <span className="hidden sm:block">New Project</span>
            </button>
          </div>
        </div>

        {folders && projects ? (
          <div className=" w-full">
            <div className="py-5 space-y-10 w-full">
              <AnimatePresence initial={false} mode="sync">
                {!projectQuery && (
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      ease: "easeInOut",
                    }}
                    key="folders"
                    className=" space-y-5 "
                  >
                    <h1 className="font-medium text-lg">
                      Folders{" "}
                      <span className="text-zinc-500">∙ {folders.length}</span>
                    </h1>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3">
                      <AnimatePresence initial={false} mode="sync">
                        {folders.map((item, idx) => (
                          <motion.li
                            layout
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0 } }}
                            transition={{
                              ease: "easeInOut",
                            }}
                            key={item.id}
                            onClick={() => {
                              setSelectedFolder(idx);
                            }}
                            className={clsx(
                              "border rounded-lg space-y-3 p-5 bg-white flex flex-col justify-between transition-shadow duration-300 cursor-pointer",
                              idx === selectedFolder
                                ? " shadow-lg  shadow-sky-100 border-sky-400"
                                : ""
                            )}
                          >
                            <div className="flex items-center  text-zinc-400 w-full">
                              <div>
                                <FolderIcon className="h-8 w-8 text-sky-400" />
                              </div>
                              <div className="mx-2">
                                <p className="font-medium text-zinc-700 select-none  truncate ">
                                  <span className="text-zinc-600">
                                    {item.projects.length}{" "}
                                    <span className="text-lg">∙</span>{" "}
                                  </span>
                                  {item.name}
                                </p>
                              </div>
                              <div className=" ml-auto">
                                <Popover
                                  placement="bottom-end"
                                  render={() => (
                                    <ul className="bg-white p-2 rounded-lg flex-col space-y-1 border border-zinc-300 shadow-xl min-w-[150px]">
                                      <li
                                        onClick={() => {
                                          setFolderName(
                                            folders[selectedFolder].name
                                          );
                                          setEditFolder(true);
                                        }}
                                        className="hover:bg-zinc-100 rounded-lg font-medium text-zinc-800 py-2 px-3 w-full text-center duration-200 transition-all cursor-pointer"
                                      >
                                        <p>Settings</p>
                                      </li>
                                      <li
                                        onClick={() => {
                                          setSelectedFolder(0);
                                          item.id && deleteFolder(item.id);
                                        }}
                                        className="hover:bg-zinc-100 rounded-lg font-medium text-zinc-800 py-2 px-3 w-full text-center duration-200 transition-all cursor-pointer"
                                      >
                                        <p>Delete</p>
                                      </li>
                                    </ul>
                                  )}
                                >
                                  <EllipsisVerticalIcon className="h-6 hover:text-sky-500 cursor-pointer" />
                                </Popover>
                              </div>
                            </div>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  </motion.div>
                )}
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    ease: "easeInOut",
                  }}
                  key="projects"
                  className=" w-full space-y-5  "
                >
                  <motion.h1 layout className="font-medium text-lg">
                    Projects{" "}
                    <span className="text-zinc-500">
                      ∙{" "}
                      {projectQuery
                        ? searchedProjects && searchedProjects.length
                        : folders[selectedFolder] &&
                          folders[selectedFolder]?.projects?.length}
                    </span>
                  </motion.h1>
                  <motion.ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 grid-cols-1  gap-6 w-full">
                    <AnimatePresence mode="popLayout">
                      {filteredProjects &&
                        (projectQuery
                          ? searchedProjects
                          : filteredProjects
                        ).map((item, idx) => (
                          <motion.li
                            layout
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{
                              scale: 1,
                              opacity: 1,
                            }}
                            exit={{
                              opacity: 0,
                              transition: {
                                duration: 0,
                                delay: 0,
                              },
                            }}
                            transition={{
                              ease: "easeInOut",
                            }}
                            key={`${item.id}`}
                            className=" border rounded-xl overflow-hidden  bg-white min-h-[150px] flex flex-col aspect-square group relative"
                          >
                            <div className="absolute sm:group-hover:flex hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-lg flex-col space-y-1 min-w-[50%] border border-zinc-300 shadow-xl">
                              <button
                                onClick={() => {
                                  setProjectName(item.name);
                                  item.id && setEditProject(item.id);
                                }}
                                className=" hover:bg-zinc-100 rounded-lg font-medium text-zinc-800 py-2 px-3 w-full text-center duration-200 transition-all"
                              >
                                Settings
                              </button>
                              <Link href={`/editor/${item.id}`}>
                                <button
                                  onClick={() =>
                                    localStorage.setItem(
                                      "lastFolder",
                                      `${selectedFolder}`
                                    )
                                  }
                                  className=" hover:bg-zinc-100 rounded-lg font-medium text-zinc-800 py-2 px-3 w-full text-center duration-200 transition-all"
                                >
                                  Open
                                </button>
                              </Link>
                              <button
                                onClick={() =>
                                  folders &&
                                  duplicate(folders[selectedFolder].id, item.id)
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
                            <div className=" min-h-[150px]  flex flex-col sm:group-hover:blur-sm sm:group-hover:brightness-90 duration-300 transition-all aspect-square">
                              <div className="h-2/3 w-full  ">
                                <ProjectImage src={item.preview} />
                              </div>
                              <div className="px-5 flex flex-col justify-between flex-1 py-4">
                                <div className="flex justify-between">
                                  <h2 className="font-medium text-zinc-700 whitespace-nowrap truncate">
                                    {item.name}
                                  </h2>
                                  <Popover
                                    placement="bottom-end"
                                    render={() => (
                                      <div className="flex z-10 bg-white p-2 rounded-lg flex-col space-y-1 min-w-[150px] border border-zinc-300 shadow-xl">
                                        <button
                                          onClick={() => {
                                            setProjectName(item.name);
                                            item.id && setEditProject(item.id);
                                          }}
                                          className=" hover:bg-zinc-100 rounded-lg font-medium text-zinc-800 py-2 px-3 w-full text-center duration-200 transition-all"
                                        >
                                          Settings
                                        </button>
                                        <Link href={`/editor/${item.id}`}>
                                          <button
                                            onClick={() =>
                                              localStorage.setItem(
                                                "lastFolder",
                                                `${selectedFolder}`
                                              )
                                            }
                                            className=" hover:bg-zinc-100 rounded-lg font-medium text-zinc-800 py-2 px-3 w-full text-center duration-200 transition-all"
                                          >
                                            Open
                                          </button>
                                        </Link>
                                        <button
                                          onClick={() =>
                                            folders &&
                                            duplicate(
                                              folders[selectedFolder].id,
                                              item.id
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
                                    )}
                                  >
                                    <EllipsisHorizontalIcon className="h-7 text-zinc-500 sm:hidden " />
                                  </Popover>
                                </div>
                                <p className="text-sm">
                                  {new Date(item.created_at).toLocaleDateString(
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
                          </motion.li>
                        ))}
                    </AnimatePresence>
                  </motion.ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Home;

const ProjectImage = ({ src }: { src: ArrayBuffer | string }) => {
  function arrayBufferToBlob(buffer: ArrayBuffer, type: string) {
    return new Blob([buffer], { type: type });
  }

  if (typeof src === "string") {
    return <img className="h-full w-full object-cover" src={src} />;
  }

  const blob = arrayBufferToBlob(src, "image/png");

  return (
    <img
      className="h-full w-full object-cover"
      src={URL.createObjectURL(blob)}
    />
  );
};
