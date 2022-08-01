import { NextPage } from "next";
import { addDoc, collection } from "firebase/firestore";
import { db, firebaseApp } from "@modules/auth/firebase/clientApp";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Card, LineChart, Spinner } from "@components/index";
import { EmojiSadIcon, RefreshIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { useUsage, useLogs } from "@utils/swr/hooks";
import { useSWRConfig } from "swr";
import { Table, Modal } from "@components/index";
import { useIdToken } from "src/common/hooks/auth";
import { DateTime } from "luxon";
const getInterval = (data) => {
  if (data?.logs.some((item) => item.status === "processing")) return 6000;
  return 0;
};
const auth = getAuth(firebaseApp);
const History: NextPage = (props) => {
  const { mutate } = useSWRConfig();

  const [spin, setSpin] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [entriesCount, setEntriesCount] = useState(0);
  const [idToken, setIdToken] = useState(props.idToken);
  const batchSize = 10; // items per chunk
  const [active, setActive] = useState(1);
  const { logs, isLoadingLogs, isErrorLogs, isValidating } = useLogs(
    idToken,
    `?limit=${batchSize}&page=${active}`,
    { refreshInterval: (data) => getInterval(data) }
  );

  useEffect(() => {
    if (logs?.entries) {
      setEntriesCount(logs.entries);
    }
  }, [logs]);

  useEffect(() => {
    console.log("running side effect");
    props.user.getIdToken().then((result) => setIdToken(result));
  }, [isErrorLogs]);

  const dispatchModal = (options) => {
    setModalContent(options);
    setOpen(true);
  };
  return (
    <div className="space-y-4 p-5 h-full overflow-y-auto">
      <div className="pb-5 dark:pb-0 border-b border-gray-200 dark:border-zinc-700 dark:border-none sm:flex sm:items-center sm:justify-between w-full">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-zinc-100">
          History
        </h3>
        <div className="mt-3 flex sm:mt-0 sm:ml-4 space-x-3">
          <button
            disabled={spin}
            type="button"
            onAnimationEnd={() => setSpin(false)}
            onClick={() => {
              setSpin(true);
              mutate(["/api/user/usage"]);
              mutate([`/api/user/logs?limit=${batchSize}&page=${active}`]);
              // asyncHero.execute();
            }}
            className="inline-flex items-center p-2 border border-gray-300 dark:border-zinc-800 dark:bg-black rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:ring-offset-zinc-800 "
          >
            <RefreshIcon
              className={clsx(
                "h-6 text-gray-400 dark:text-zinc-300  ",
                spin && "animate-spin-slow"
              )}
            />
          </button>
          {/* <button
          
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Token
          </button> */}
        </div>
      </div>

      {isErrorLogs && (
        <p className="text-red-400 font-medium">
          logs error: {isErrorLogs.message}
        </p>
      )}
      <Table
        isValidating={isValidating}
        logs={logs?.logs}
        isLoading={isLoadingLogs}
        dispatchModal={dispatchModal}
        batchSize={10}
      />

      <Pagination
        pages={Math.ceil(entriesCount / batchSize)}
        setActive={setActive}
        active={active}
        size={entriesCount}
        batchSize={10}
      />

      <Modal open={open} setOpen={setOpen} content={modalContent} />
    </div>
  );
};

const Pagination = (props) => {
  return (
    <div className="flex items-center justify-between  bg-white px-4 py-3 sm:px-6 dark:bg-black">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          disabled={props.active === 1}
          onClick={() => props.setActive(props.active - 1)}
          className="relative inline-flex items-center rounded-md border border-gray-300 dark:border-zinc-900 bg-white dark:bg-black px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          disabled={props.active === props.pages}
          onClick={() => props.setActive(props.active + 1)}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 dark:borer-zinc-900 bg-white dark:bg-black px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-zinc-100">
            Showing{" "}
            <span className="font-medium">
              {1 + (props.active - 1) * props.batchSize}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {props.active * props.batchSize > props.size
                ? props.size
                : props.active * props.batchSize}
            </span>{" "}
            of <span className="font-medium">{props.size}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              disabled={props.active === 1}
              onClick={() => props.setActive(props.active - 1)}
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white dark:bg-black dark:border-zinc-900 dark:text-zinc-200 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-900 "
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Current: "z-10 bg-blue-50 border-blue-500 text-blue-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {props.pages > 5 ? (
              <>
                {(Math.ceil(props.active / 5) - 1) * 5 > 0 && (
                  <>
                    <button
                      className={
                        props.active === 1
                          ? " relative z-10 inline-flex items-center border border-blue-500 dark:bg-blue-900 dark:text-blue-200  bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600"
                          : "relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-900 dark:bg-black dark:border-zinc-900 dark:text-zinc-200"
                      }
                      onClick={() => props.setActive(1)}
                    >
                      {1}
                    </button>
                    <span className="relative inline-flex items-center border border-gray-300 bg-white dark:bg-black dark:border-zinc-900 dark:text-zinc-200 px-4 py-2 text-sm font-medium text-gray-500 ">
                      ...
                    </span>
                  </>
                )}
                {Array.from(Array(props.pages))
                  .map((item, idx) => idx + 1)
                  .slice(
                    (Math.ceil(props.active / 5) - 1) * 5,
                    Math.ceil(props.active / 5) * 5
                  )
                  .map((item, ind) => {
                    return (
                      <button
                        className={
                          props.active === item
                            ? " relative z-10 inline-flex items-center border border-blue-500 dark:bg-blue-900 dark:text-blue-200  bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600"
                            : "relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-900 dark:bg-black dark:border-zinc-900 dark:text-zinc-200"
                        }
                        id={ind}
                        onClick={() => props.setActive(item)}
                      >
                        {item}
                      </button>
                    );
                  })}
                {Math.floor(props.pages / 5) >= props.active / 5 && (
                  <>
                    <span className="relative inline-flex items-center border border-gray-300 bg-white dark:bg-black dark:border-zinc-900 dark:text-zinc-200 px-4 py-2 text-sm font-medium text-gray-500">
                      ...
                    </span>
                    <button
                      className={
                        props.active === props.pages
                          ? " relative z-10 inline-flex items-center border border-blue-500 dark:bg-blue-900 dark:text-blue-200  bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600"
                          : "relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-900 dark:bg-black dark:border-zinc-900 dark:text-zinc-200"
                      }
                      onClick={() => props.setActive(props.pages)}
                    >
                      {props.pages}
                    </button>
                  </>
                )}
              </>
            ) : (
              Array.from(Array(props.pages)).map((item, ind) => {
                return (
                  <button
                    className={
                      props.active === ind + 1
                        ? " relative z-10 inline-flex items-center border border-blue-500 dark:bg-blue-900 dark:text-blue-200  bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600"
                        : "relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-900 dark:bg-black dark:border-zinc-900 dark:text-zinc-200"
                    }
                    id={ind}
                    onClick={() => props.setActive(++ind)}
                  >
                    {ind + 1}
                  </button>
                );
              })
            )}

            <button
              disabled={props.active === props.pages}
              onClick={() => props.setActive(props.active + 1)}
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white dark:bg-black dark:border-zinc-900 dark:text-zinc-200 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:hover:bg-zinc-900 cursor-pointer"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
export default History;
