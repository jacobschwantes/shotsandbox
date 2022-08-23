import { NextPage } from "next";
import { LineChart } from "@components/index";
import Link from "next/link";
import { useState, useEffect, SVGProps } from "react";
import {
  EmojiSadIcon,
  RefreshIcon,
  CalculatorIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import clsx from "clsx";
import { useUsage } from "@hooks/swr";
import { useSWRConfig } from "swr";
import { DateTime } from "luxon";
import { User } from "firebase/auth";
import { NextComponentType, NextPageContext } from "next";
interface DashboardProps {
  idToken: string;
  user: User;
}
const Dashboard: NextPage<DashboardProps> = (props) => {
  const { mutate } = useSWRConfig();
  const [idToken, setIdToken] = useState(props.idToken);
  const [spin, setSpin] = useState(false);
  const { usage, isLoading, isError } = useUsage(
    idToken,
    DateTime.now().zoneName.replace("/", "-")
  );
  useEffect(() => {
    if (isError) {
      props.user.getIdToken().then((result) => setIdToken(result));
    }
  }, [isError, props.user]);
  const [data, setData] = useState("1w");
  return (
    <div className="space-y-4 p-5 overflow-y-auto h-full ">
      <div className="pb-5  border-b border-gray-200 dark:border-zinc-700 dark:border-none items-center flex justify-between w-full">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-zinc-100">
          Dashboard
        </h3>
        <div className=" flex sm:mt-0  space-x-3">
          <button
            disabled={spin}
            type="button"
            onAnimationEnd={() => setSpin(false)}
            onClick={() => {
              setSpin(true);
              mutate(["/api/user/usage"]);
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
        </div>
      </div>
      <Stats
        isLoading={isLoading}
        stats={[
          {
            id: 1,
            name: "Requests",
            stat: usage?.data.usage,
            href: "/history",
            icon: PaperAirplaneIcon,
            change: "122",
            changeType: "increase",
          },
          {
            id: 2,
            name: "Quota Remaining",
            href: "/settings/billing",
            stat: usage?.data.quota - usage?.data.usage,
            icon: CalculatorIcon,
            change: "5.4%",
            changeType: "increase",
          },
          {
            id: 3,
            name: "Failed Requests",
            href: "/history",
            stat: `${(usage?.data?.errorCount === 0
              ? 0
              : (usage?.data?.errorCount / usage?.data?.usage) * 100
            ).toFixed(2)}%`,
            icon: EmojiSadIcon,
            change: "3.2%",
            changeType: "decrease",
          },
        ]}
      />
      {
        <LineChart
          isLoading={isLoading}
          seriesOption={data}
          setData={setData}
          data={
            data === "1w"
              ? usage?.data.chartData.usage7day
              : usage?.data.chartData.usage30day
          }
          dark={true}
        />
      }
    </div>
  );
};
interface StatsProps {
  isLoading: boolean;
  stats: {
    icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
    id: number;
    name: string;
    stat?: number | string;
    href: string;
    change: string;
    changeType: string;
  }[];
}
const Stats: NextComponentType<NextPageContext, {}, StatsProps> = (props) => {
  return (
    <div>
      {props.isLoading ? (
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 opacity-70">
          {Array.from(Array(3)).map((item) => (
            <div
              key={item}
              className="relative bg-white dark:bg-black shadow rounded-2xl overflow-hidden dark:border dark:border-zinc-900 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-rose-100/10 before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent"
            >
              <div className="flex items-center space-x-4 p-6">
                <div className=" bg-zinc-900 rounded-md p-3">
                  <div className="h-6 w-6 text-zinc-900" />
                </div>
                <div className="flex flex-col flex-1 space-y-3">
                  <p className="h-3 w-1/6 rounded-full bg-zinc-900 text-sm font-medium text-gray-500 truncate dark:text-zinc-100"></p>
                  <p className="text-2xl h-3 w-1/3 rounded-full bg-zinc-900 font-semibold text-gray-900 dark:text-zinc-200"></p>{" "}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-black p-6 dark:border-t dark:border-zinc-900 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-rose-100/10 before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent">
                <div className="h-3 w-1/6 bg-zinc-900 rounded-full"></div>
              </div>
            </div>
          ))}
        </dl>
      ) : (
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {props.stats.map((item) => (
            <div
              key={item.id}
              className="relative bg-white dark:bg-black pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-2xl overflow-hidden dark:border dark:border-zinc-900"
            >
              <dt>
                <div className="absolute bg-blue-500 rounded-md p-3">
                  <item.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate dark:text-zinc-100">
                  {item.name}
                </p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-200">
                  {item.stat}
                </p>
                {/* <p
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
              </p> */}
                <div className="absolute bottom-0 inset-x-0 bg-gray-50 dark:bg-black px-4 py-4 sm:px-6 dark:border-t dark:border-zinc-900">
                  <div className="text-sm">
                    <Link href={item.href}>
                      <a className="font-medium text-blue-600 hover:text-blue-500">
                        View all
                        <span className="sr-only"> {item.name} stats</span>
                      </a>
                    </Link>
                  </div>
                </div>
              </dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
};

export default Dashboard;
