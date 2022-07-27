import { NextPage } from "next";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Card, LineChart, Spinner } from "@components/index";
import { useState } from "react";
import { EmojiSadIcon, RefreshIcon, ReceiptTaxIcon, CalculatorIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { useUsage, useLogs } from "@utils/swr/hooks";
import { useSWRConfig } from "swr";
import { Table } from "@components/index";
const Dashboard: NextPage = (props) => {
  const { mutate } = useSWRConfig();
  const [spin, setSpin] = useState(false);
  const { usage, isLoading, isError } = useUsage(props.idToken);
  const batchSize = 5; // items per chunk
  const [active, setActive] = useState(1);

  return (
    <div className="space-y-4 p-5 overflow-y-auto h-full ">
      <div className="pb-5 dark:pb-0 border-b border-gray-200 dark:border-zinc-700 dark:border-none sm:flex sm:items-center sm:justify-between w-full">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-zinc-100">
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
      <Stats
        stats={[
          {
            id: 1,
            name: "Requests",
            stat: usage?.data.usage,
            icon: PaperAirplaneIcon,
            change: "122",
            changeType: "increase",
          },
          {
            id: 2,
            name: "Quota Remaining",
            stat: usage?.data.quota - usage?.data.usage,
            icon: CalculatorIcon,
            change: "5.4%",
            changeType: "increase",
          },
          {
            id: 3,
            name: "Failed Requests",
            stat: "24.57%",
            icon: EmojiSadIcon,
            change: "3.2%",
            changeType: "decrease",
          },
        ]}
      />
      {/* <div className="grid grid-cols-3 gap-4  ">
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
          count={0}
          isLoading={isLoading}
          isError={isError}
          change={5.2}
        />
      </div> */}
      <LineChart dark={true} />
    </div>
  );
};

/* This example requires Tailwind CSS v2.0+ */
import { ArrowSmDownIcon, ArrowSmUpIcon } from "@heroicons/react/solid";
import {
  CursorClickIcon,
  MailOpenIcon,
  UsersIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";

const stats = [
  {
    id: 1,
    name: "Requests",
    stat: "71,897",
    icon: PaperAirplaneIcon,
    change: "122",
    changeType: "increase",
  },
  {
    id: 2,
    name: "Avg. Open Rate",
    stat: "58.16%",
    icon: MailOpenIcon,
    change: "5.4%",
    changeType: "increase",
  },
  {
    id: 3,
    name: "Failed Requests",
    stat: "24.57%",
    icon: EmojiSadIcon,
    change: "3.2%",
    changeType: "decrease",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Stats(props) {
  return (
    <div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {props.stats.map((item) => (
          <div
            key={item.id}
            className="relative bg-white dark:bg-black pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-2xl overflow-hidden dark:border dark:border-zinc-900"
          >
            <dt>
              <div className="absolute bg-blue-500 rounded-md p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate dark:text-zinc-100">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-200">
                {item.stat}
              </p>
              <p
                className={classNames(
                  item.changeType === "increase"
                    ? "text-green-600"
                    : "text-red-600",
                  "ml-2 flex items-baseline text-sm font-semibold"
                )}
              >
                {item.changeType === "increase" ? (
                  <ArrowSmUpIcon
                    className="self-center flex-shrink-0 h-5 w-5 text-green-500"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowSmDownIcon
                    className="self-center flex-shrink-0 h-5 w-5 text-red-500"
                    aria-hidden="true"
                  />
                )}

                <span className="sr-only">
                  {item.changeType === "increase" ? "Increased" : "Decreased"}{" "}
                  by
                </span>
                {item.change}
              </p>
              <div className="absolute bottom-0 inset-x-0 bg-gray-50 dark:bg-black px-4 py-4 sm:px-6 dark:border-t dark:border-zinc-900">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    {" "}
                    View all<span className="sr-only"> {item.name} stats</span>
                  </a>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default Dashboard;
