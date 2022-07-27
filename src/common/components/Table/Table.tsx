import { ExternalLinkIcon } from "@heroicons/react/outline";
import {
  CashIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  OfficeBuildingIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
const transactions = [
  {
    id: 1,
    name: "Payment to Molly Sanders",
    href: "#",
    amount: "$20,000",
    currency: "USD",
    status: "failed",
    date: "July 11, 2020",
    datetime: "2020-07-11",
  },
  {
    id: 2,
    name: "Payment to Molly Sanders",
    href: "#",
    amount: "$20,000",
    currency: "USD",
    status: "processing",
    date: "July 11, 2020",
    datetime: "2020-07-11",
  },
  {
    id: 3,
    name: "Payment to Molly Sanders",
    href: "#",
    amount: "$20,000",
    currency: "USD",
    status: "success",
    date: "July 11, 2020",
    datetime: "2020-07-11",
  },
  // More transactions...
];
const statusStyles = {
  success: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  failed: "bg-gray-100 text-gray-800",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Table({ logs, dispatchModal }) {
  return (
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
              Result
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-black divide-y divide-gray-200 dark:divide-zinc-900     ">
          {logs.map((transaction, index) => (
            <tr key={index} className="bg-white dark:bg-black rounded-2xl ">
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
                <time>
                  {new Date(transaction.timestamp).toLocaleString()}
                </time>
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 rounded-2xl ">
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
  );
}
