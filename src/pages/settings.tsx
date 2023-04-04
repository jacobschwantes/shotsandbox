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
        <title>ShotSandbox - Settings</title>
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
          <div className="py-5">
            <button
              onClick={() => deleteDb()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500  transition-all duration-300 "
            >
              <TrashIcon className="h-4 w-4 sm:mr-1" />
              <span className="">Clear DB</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
