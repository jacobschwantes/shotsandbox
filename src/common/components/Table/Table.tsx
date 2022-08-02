import { ExternalLinkIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import Link from "next/link";
import { Spinner } from "..";
const statusStyles = {
  success:
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400 dark:bg-opacity-50",
  processing:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-400 dark:backdrop-opacity-50",
  failed:
    "bg-gray-100 text-gray-800 dark:bg-zinc-900 dark:text-zinc-300 dark:backdrop-opacity-50",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Table({ logs, dispatchModal, isLoading, batchSize, isValidating }) {
  return !isLoading && logs ? (
    <div className="rounded-2xl bg-white dark:bg-black border shadow-lg dark:shadow-none shadow-gray-100  border-gray-200 dark:border-zinc-900">
      <table className="   divide-y divide-gray-200 dark:divide-zinc-900 ">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 dark:bg-black text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-2xl">
              URL
            </th>

            <th className="hidden px-6 py-3 bg-gray-50 dark:bg-black text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
              Status
            </th>
            <th className="px-6 py-3 bg-gray-50 dark:bg-black text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-2xl">
              Date
            </th>

            <th className="px-6 py-3 bg-gray-50 dark:bg-black text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-2xl">
              Latency
            </th>
            <th className="px-6 py-3 bg-gray-50 dark:bg-black text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-2xl">
              Result
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-black divide-y divide-gray-200 dark:divide-zinc-900     ">
          {logs.map((transaction, index) => (
            <tr key={index} className={clsx(isValidating && " opacity-90", "bg-white dark:bg-black rounded-2xl transition-all ")}>
              <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900 rounded-2xl">
                <div className="flex ">
                  <p className="text-gray-500 truncate group-hover:text-gray-900 ">
                    {transaction.url}
                  </p>
                </div>
              </td>

              <td className=" px-6 py-4 whitespace-nowrap text-sm text-gray-500  ">
                <span
                  className={classNames(
                    statusStyles[transaction.status],
                    " items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                  )}
                >
                  {transaction.status}
                </span>
              </td>
              <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500 rounded-2xl">
                <time>{new Date(transaction.timestamp).toLocaleString()}</time>
              </td>
              <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500 rounded-2xl">
                {transaction.status === "processing" ? (
                  <Spinner className="h-5 w-5" />
                ) : (
                  `${transaction.latency} ms`
                )}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 rounded-2xl flex justify-center ">
                {transaction.status === "success" ? (
                  <Link
                    passHref
                    target="_blank"
                    href={transaction.href}
                    rel="noreferrer"
                  >
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 flex items-center justify-center"
                    >
                      <ExternalLinkIcon className="h-5" />
                    </a>
                  </Link>
                ) : transaction.status === "processing" ? (
                  <Spinner className="h-5 w-5" />
                ) : (
                  <button
                    onClick={() =>
                      dispatchModal({ message: transaction.error })
                    }
                    className="text-blue-500 font-medium"
                  >
                    View logs
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <LoadingState items={batchSize} />
  );
}

const LoadingState = (props) => (
  <div className="overflow-hidden relative rounded-2xl bg-white dark:bg-black border shadow-lg dark:shadow-none shadow-gray-100  border-gray-200 dark:border-zinc-900 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-rose-100/10 before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent">
    <table className="   divide-y divide-gray-200 dark:divide-zinc-900 ">
      <thead>
        <tr>
          <th className="px-6 py-3 bg-gray-50 dark:bg-black text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-2xl">
            URL
          </th>
          <th className="hidden px-6 py-3 bg-gray-50 dark:bg-black text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
            Status
          </th>
          <th className="px-6 py-3 bg-gray-50 dark:bg-black text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-2xl">
            Date
          </th>

          <th className="px-6 py-3 bg-gray-50 dark:bg-black text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-2xl">
            Result
          </th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-black divide-y divide-gray-200 dark:divide-zinc-900     ">
        {Array.from(Array(props.items).keys()).map((transaction, index) => (
          <tr key={index} className="bg-white dark:bg-black rounded-2xl ">
            <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900 rounded-2xl">
              <div className="flex ">
                <p className="text-gray-500 truncate group-hover:text-gray-900 h-3 bg-zinc-900 w-1/4 rounded-full "></p>
              </div>
            </td>
            <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500 rounded-2xl">
              <p className="h-3 bg-zinc-900 w-30 rounded-full"></p>
            </td>
            <td className=" px-6 py-4 whitespace-nowrap text-sm text-gray-500  ">
              <p className={"  h-3 bg-zinc-900 w-16 rounded-full"}></p>
            </td>
            <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500 rounded-2xl">
              <p className="h-3 bg-zinc-900 w-30 rounded-full"></p>
            </td>
            <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 rounded-2xl ">
              <p className="h-5 bg-zinc-900  w-5 rounded-full"></p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
