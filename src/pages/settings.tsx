import type { NextPage } from "next";
import Head from "next/head";
import { TrashIcon } from "@heroicons/react/solid";
import { recreateDB } from "src/db";
import { toast } from "react-toastify";
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>ShotSandbox - Settings</title>
      </Head>
      <div className="p-6 bg-zinc-50 min-h-screen ">
        <div className="flex justify-between">
          <div className="py-5">
            <button
              onClick={() =>
                toast.promise(recreateDB, {
                  pending: "Clearning DB...",
                  success: "DB cleared",
                  error: "Error clearing DB",
                })
              }
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
