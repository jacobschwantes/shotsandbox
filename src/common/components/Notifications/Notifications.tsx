import { Fragment, useEffect, useMemo } from "react";
import { Transition } from "@headlessui/react";
import { Menu } from "@headlessui/react";
import {
  BellIcon,
  ClockIcon,
  MailIcon,
  CalendarIcon,
} from "@heroicons/react/outline";
import { createToast } from "vercel-toast";
import "vercel-toast/dist/vercel-toast.css";
import { CheckIcon } from "@heroicons/react/solid";
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function findTime(time) {
  let now = Date.now();
  let difference = now / 1000 - time;
  if (difference < 3600) {
    return `${Math.round(difference / 60)} minutes ago`;
  }
  if (difference < 86400) {
    return `about ${Math.round(difference / 3600)} hours ago`;
  } else {
    return `${(difference / 86400).toFixed(0)} days ago`;
  }
}
const unread = [
  {
    icon: MailIcon,
    message: "You have a new message",
    submessage: "7 unread messages.",
    timestamp: 1643689162,
  },
  {
    icon: CalendarIcon,
    message: "You have a new message",
    submessage: "7 unread messages.",
    timestamp: 1643689162,
  },
];
const read = [
  {
    icon: MailIcon,
    message: "You have a new message",
    submessage: "7 unread messages.",
    timestamp: 1643689162,
  },
  {
    icon: CalendarIcon,
    message: "You have a new message",
    submessage: "7 unread messages.",
    timestamp: 1643689162,
  },
];
import { db, firebaseApp } from "@modules/auth/firebase/clientApp";
import { getAuth } from "firebase/auth";
const auth = getAuth(firebaseApp);
const start = Date.now();

export default function Notifications(props) {
  const isLoading = false;
  const mref = useMemo(() => query(collection(db, "users", auth.currentUser?.uid, "notifications"), where("timestamp", ">", start)), []);
  useEffect(() => {
    const unsubscribe = onSnapshot(mref, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let data = change.doc.data();
        if (change.type === "added") {
          if (data.timestamp > start) {
            createToast(`${data.message}`, {
              timeout: 10000,
              type: "dark",
              action: {
                text: "Dismiss",
                callback(toast) {
                  toast.destroy();
                },
              },
            });
          }
        }
      });
    });
    return () => unsubscribe();
  }, []);

  return (
    <Menu as="div" className=" inline-block  text-left xs:relative ">
      <div className="flex items-center">
        <Menu.Button className=" transition-transform hover:scale-110 ">
          <span className=" absolute z-10 rounded-xl bg-red-500 px-1 text-xs font-semibold text-white ">
            {unread.length}
          </span>

          <BellIcon
            className="h-7 w-7 text-gray-700 hover:text-gray-800"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-300"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-200"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className=" absolute right-8 z-10 mt-2 origin-top-right rounded-md  bg-white shadow-lg ring-1  ring-black  ring-opacity-5 focus:outline-none xs:right-0 xs:left-auto xs:w-80 w-80 ">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div className=" flex items-center justify-between border-b px-4 py-2 font-semibold transition-colors ">
                  <div className="flex flex-col ">
                    Notifications
                    <span className="text-sm font-normal text-gray-500">
                      {isLoading
                        ? "loading.."
                        : `You have ${unread.length} unread messages`}
                    </span>
                  </div>
                  <CheckIcon className="h-6 w-6 cursor-pointer text-blue-500 hover:scale-110 hover:text-blue-600" />
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div className="block   text-sm transition-colors">
                  <h1 className="px-3 py-1 text-sm font-semibold text-gray-500">
                    NEW
                  </h1>
                  {!isLoading
                    ? unread.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex cursor-pointer items-center space-x-3 bg-blue-50 p-3 hover:bg-gray-100 "
                          >
                            <MailIcon
                              className="h-10 w-10 flex-shrink-0 rounded-full  text-blue-500 transition-colors"
                              aria-hidden="true"
                            />
                            <div className="flex flex-col space-y-1">
                              <h1 className="font-semibold ">{item.message}</h1>
                              <p className="font-normal text-gray-500 ">
                                {item.submessage}
                              </p>
                              <h1 className="flex items-center text-xs text-gray-400">
                                <ClockIcon className="mr-1 h-3 w-3 text-gray-400" />{" "}
                                {findTime(item.timestamp / 1000)}
                              </h1>
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
              )}
            </Menu.Item>
          </div>
          <div className="">
            <Menu.Item>
              {({ active }) => (
                <div className="block   text-sm transition-colors">
                  <h1 className="px-3 py-1 text-sm font-semibold text-gray-500">
                    RECENT
                  </h1>
                  {unread.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex cursor-pointer items-start space-x-3 p-3 hover:bg-gray-100 "
                      >
                        <item.icon
                          className="h-10 w-10 flex-shrink-0 rounded-full  text-blue-500 transition-colors"
                          aria-hidden="true"
                        />
                        <div className="flex flex-col space-y-1">
                          <h1 className="font-semibold ">{item.message}</h1>
                          <p className="font-normal text-gray-500 ">
                            {item.submessage}
                          </p>
                          <h1 className="flex items-center text-xs text-gray-400">
                            <ClockIcon className="mr-1 h-3 w-3 text-gray-400" />{" "}
                            {findTime(item.timestamp)}
                          </h1>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Menu.Item>
          </div>
          <div className="">
            <Menu.Item>
              {({ active }) => (
                <a
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block cursor-pointer rounded-b-lg border-t px-4 py-2 text-center text-sm transition-colors"
                  )}
                >
                  View All
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
