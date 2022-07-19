import { NextPage } from "next";
import { getAuth } from "firebase/auth";
import firebaseApp from "@modules/auth/firebase/clientApp";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Card, LineChart, Spinner } from "@components/index";
import { useAsync } from "react-async-hook";
import { useState } from "react";
import { RefreshIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { useUsage, useLogs } from "@utils/swr/hooks";
import { useSWRConfig } from "swr";
import { Table } from "@components/index";
const Dashboard: NextPage = (props) => {
  const { mutate } = useSWRConfig();
  const auth = getAuth(firebaseApp);
  const [spin, setSpin] = useState(false);
  const { usage, isLoading, isError } = useUsage(props.idToken);
  const {logs, isLoadingLogs, isErrorLogs} = useLogs(props.idToken);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const batchSize = 5; // items per chunk
  const [active, setActive] = useState(1);
  const failedCount = logs?.logs.filter((obj) => {
    if (obj.status === 'failed') {
      return true;
    }
    })
  // let searchedTasks = logs.filter((item) => {
  //   let lowercase = item.name.toLowerCase();
  //   return lowercase.includes(search.toLocaleLowerCase());
  // });
  // const asyncHero = useAsync(async () => {
  //   if (false) {
  //     return [];
  //   } else {
  //     return processFetch();
  //   }
  // }, []);
  // const processFetch = async () => {
  //   const authToken = await auth.currentUser?.getIdToken();
  //   const res = await fetch("/api/user/usage", {
  //     headers: { Authorization: `Bearer ${authToken}` },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setUsage(data.data))
  //     .catch((e) => console.log("error, ", e));
  // };
  return (
    <div className="flex-1 p-5 space-y-4">
      <div className="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between w-full">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Dashboard
        </h3>
        <div className="mt-3 flex sm:mt-0 sm:ml-4 space-x-3">
          <button
            disabled={spin}
            type="button"
            onAnimationEnd={() => setSpin(false)}
            onClick={() => {
              setSpin(true);
              mutate(["/api/user/usage", props.idToken]);
              mutate(["/api/user/logs", props.idToken]);
              // asyncHero.execute();
            }}
            className="inline-flex items-center p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 "
          >
            <RefreshIcon
              className={clsx(
                "h-6 text-gray-400 ",
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
      <div className="grid grid-cols-3 gap-4  ">
        <Card
          title="Requests"
          type="count"
          count={usage?.data.usage}
          isLoading={isLoading}
          isError={isError}
          change={5.2}
        />
        <Card
          title="Quota remaining"
          type="count"
          count={usage?.data.quota - usage?.data.usage}
          isLoading={isLoading}
          isError={isError}
          change={5.2}
        />
        <Card
          title="Failed requests"
          type="count"
          count={logs?.logs.filter((obj) => {
            if (obj.status === 'failed') {
              return true;
            }
            }).length}
          isLoading={isLoading}
          isError={isError}
          change={5.2}
        />
      </div>
      <LineChart/>
      {isLoadingLogs && <Spinner color="blue"/>}
      {isErrorLogs && <p className="text-red-400 font-medium">logs error: {isErrorLogs}</p>}
      {logs?.logs && <Table logs={logs.logs}  />}
      {logs?.logs &&
      <Pagination
        pages={Math.ceil(logs.logs.length / batchSize)}
        setActive={setActive}
        active={active}
        size={25}
        batchSize={5}
      />}
    </div>
  );
};

const Pagination = (props) => {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          disabled={props.active === 1}
          onClick={() => props.setActive(props.active - 1)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          disabled={props.active === props.pages}
          onClick={() => props.setActive(props.active + 1)}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
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
              className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Current: "z-10 bg-blue-50 border-blue-500 text-blue-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {Array.from(Array(props.pages)).map((item, ind) => {
              return (
                <button
                  className={
                    props.active === ind + 1
                      ? " relative z-10 inline-flex items-center border border-blue-500 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600"
                      : "relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                  }
                  id={ind}
                  onClick={() => props.setActive(++ind)}
                >
                  {ind + 1}
                </button>
              );
            })}

            <button
              disabled={props.active === props.pages}
              onClick={() => props.setActive(props.active + 1)}
              className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
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

export default Dashboard;
