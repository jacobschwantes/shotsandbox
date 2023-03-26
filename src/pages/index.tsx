import type { NextPage } from "next";
import Head from "next/head";
import { Modal, Popover } from "@components/index";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FolderAddIcon,
  FolderIcon,
  PencilIcon,
  SearchIcon,
  TrashIcon,
  ViewGridAddIcon,
} from "@heroicons/react/outline";
import { useMemo, useState } from "react";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
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
  const removeFolder = (id: number) => {
    setSelectedFolder(0);
    deleteFolder(id);
  };
  const handleDeleteProject = (id: number) => {};

  const filteredProjects = useMemo(() => {
    if (projects && folders && folders[selectedFolder]) {
      return projects.filter((project) =>
        folders[selectedFolder].projects.includes(project.id as number)
      );
    } else return [];
  }, [projects, selectedFolder, folders]);
  return (
    <>
      <Head>
        <title>ShotSandbox - Dashboard</title>
      </Head>
      <div className="px-6 bg-zinc-50 min-h-screen ">
        <Modal
          callback={() => {
            insertFolder(folderName);
            setFolderName("");
            setOpenFolder(false);
          }}
          heading="Add folder"
          open={openFolder}
          setOpen={setOpenFolder}
        >
          <div className="space-y-2">
            <h1 className="font-medium text-zinc-900 ">Name</h1>
            <input
              value={folderName}
              onChange={(e) => {
                setFolderName(e.target.value);
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
              value={folderName}
              onChange={(e) => {
                setFolderName(e.target.value);
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
          callback={() => {
            if (projects && projects[editProject]) {
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
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
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
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
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
        <div className="flex justify-between items-center pt-7">
          <div className="flex items-center space-x-2 rounded-lg border bg-white px-5 flex-1 max-w-lg">
            <SearchIcon className="h-5 text-zinc-500" />
            <input
              value={projectQuery}
              onChange={(e) => setProjectQuery(e.target.value)}
              type="text"
              placeholder="Search projects"
              className="h-12 w-full border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm focus:outline-none"
            ></input>
          </div>
          <div className="flex items-start space-x-2 justify-self-end">
            <button
              onClick={() => {
                setFolderName("New folder");
                setOpenFolder(true);
              }}
              className=" whitespace-nowrap inline-flex items-center px-4 py-3 border  rounded-lg text-sm font-medium text-black  bg-white hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:ring-offset-black transition-all duration-300"
            >
              <FolderAddIcon className="h-5 w-5 sm:mr-1" />
              <span className="hidden sm:block">New Folder</span>
            </button>

            <button
              onClick={() => {
                setProjectName("New project");
                setOpenProject(true);
              }}
              className="inline-flex items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:ring-offset-black transition-all duration-300 "
            >
              <ViewGridAddIcon className="h-4 w-4 sm:mr-1" />
              <span className="hidden sm:block">New Project</span>
            </button>
          </div>
        </div>

        {folders && projects && (
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
                    <ul className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-3">
                      <AnimatePresence initial={false} mode="sync">
                        {folders.map((item, idx) => (
                          <motion.li
                            layout
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{
                              ease: "easeInOut",
                            }}
                            key={item.id}
                            onClick={() => setSelectedFolder(idx)}
                            className={clsx(
                              "border rounded-lg space-y-3 p-5 bg-white flex flex-col justify-between",
                              idx === selectedFolder ? "border-sky-500 " : ""
                            )}
                          >
                            <div className="flex justify-between text-zinc-400 w-full">
                              <span className="flex items-center">
                                <FolderIcon className="h-7 mr-1.5" />
                                <h2 className="font-medium text-zinc-700 whitespace-nowrap truncate">
                                  {item.name}
                                </h2>
                              </span>
                              <div className="">
                                <Popover
                                  placement="bottom-end"
                                  render={() => (
                                    <ul className="bg-white text-zinc-800 p-1 border rounded-lg shadow min-w-[150px] flex justify-start flex-col ">
                                      <li
                                        onClick={() => {
                                          setFolderName(
                                            folders[selectedFolder].name
                                          );
                                          setEditFolder(true);
                                        }}
                                        className="hover:bg-zinc-100 w-full text-left px-2 py-1 rounded-md flex items-center justify-between"
                                      >
                                        <p>Edit</p>
                                        <PencilIcon className="h-4" />
                                      </li>
                                      <li
                                        onClick={() => {
                                          item.id && removeFolder(item.id);
                                        }}
                                        className="hover:bg-zinc-100 w-full text-left px-2 py-1 rounded-md flex items-center justify-between"
                                      >
                                        <p>Delete</p>
                                        <TrashIcon className="h-4" />
                                      </li>
                                    </ul>
                                  )}
                                >
                                  <DotsHorizontalIcon className="h-7 hover:text-sky-500" />
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
                  <motion.ul
                    animate={{
                      transition: {
                        staggerChildren: 0.1,
                      },
                    }}
                    className="grid grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6  gap-6 w-full"
                  >
                    <AnimatePresence mode="wait">
                      {filteredProjects &&
                        (projectQuery
                          ? searchedProjects
                          : filteredProjects
                        ).map(
                          (item, idx) =>
                            item.id &&
                            folders[selectedFolder] &&
                            folders[selectedFolder].projects.includes(
                              item.id
                            ) && (
                              <motion.li
                                layout
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{
                                  scale: 1,
                                  opacity: 1,
                                  transition: {
                                    delay:
                                      Math.max(0.05, 0.1 - idx * 0.05) * idx,
                                  },
                                }}
                                exit={{
                                  scale: 0.8,
                                  opacity: 0,
                                  transition: { duration: 0.25, delay: 0 },
                                }}
                                transition={{
                                  ease: "easeInOut",
                                }}
                                key={item.id}
                                className=" border rounded-xl overflow-hidden  bg-white min-h-[150px] flex flex-col aspect-square group relative"
                              >
                                <div className="absolute group-hover:flex hidden top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-lg flex-col space-y-1 min-w-[50%] border border-zinc-300 shadow-xl">
                                  <Link href={`/editor/${item.id}`}>
                                    <button className=" hover:bg-zinc-100 rounded-lg font-medium text-zinc-800 py-2 px-3 w-full text-center duration-200 transition-all">
                                      Open
                                    </button>
                                  </Link>
                                  <button
                                    onClick={() => {
                                      setProjectName(item.name);
                                      item.id && setEditProject(item.id);
                                    }}
                                    className=" hover:bg-zinc-100 rounded-lg font-medium text-zinc-800 py-2 px-3 w-full text-center duration-200 transition-all"
                                  >
                                    Edit
                                  </button>
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
                                <div className=" min-h-[150px] flex flex-col group-hover:blur-sm group-hover:brightness-90 duration-300 transition-all">
                                  <img
                                    className="object-cover h-2/3"
                                    src={
                                      typeof item.preview === "string"
                                        ? item.preview
                                        : URL.createObjectURL(item.preview)
                                    }
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
                              </motion.li>
                            )
                        )}
                    </AnimatePresence>
                  </motion.ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
