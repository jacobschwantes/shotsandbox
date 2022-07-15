import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  FolderIcon,
  ClipboardListIcon,
  LinkIcon,
  NewspaperIcon,
  DatabaseIcon,
  ChipIcon,
  CalendarIcon,
  ChatAlt2Icon,
  UsersIcon,
  SpeakerphoneIcon,
  CogIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
// const navigation = [
//   { name: "Pricing", href: "/pricing", icon: CreditCardIcon },
//   { name: "Download", href: "/download", icon: DownloadIcon },
//   { name: "Docs", href: "#", icon: BookOpenIcon },
//   { name: "App", href: "#", icon: ChipIcon },
// ];
import Link from "next/link";
import { signOut, getAuth } from "firebase/auth";
import firebaseApp from "@modules/auth/firebase/clientApp";
import { useRouter } from "next/router";
const auth = getAuth(firebaseApp);
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation(props) {
  const router = useRouter()
  const generalNavigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: ChipIcon,
      current: router.asPath === "/",
    },
    {
      name: "Projects",
      href: "/dashboard",
      icon: FolderIcon,
      current: router.asPath.includes("dashboard"),
    },
    {
      name: "Notes",
      href: "/notes",
      icon: ClipboardListIcon,
      current:router.asPath.includes("notes"),
    },
    {
      name: "News",
      href: "/news",
      icon: NewspaperIcon,
      current: router.asPath.includes("news"),
    },
    {
      name: "Resources",
      href: "/resources",
      icon: LinkIcon,
      current: props.active.includes("resources"),
    },
    {
      name: "Settings",
      href: "/settings",
      icon: CogIcon,
      current: router.asPath.includes("settings"),
    },
  ];
  const adminNavigation = [
    {
      name: "Logout",
      href: "/logout",
      icon: LogoutIcon,
      action: props.active === "logout",
    },
  ];
  return (
    <nav className=" flex flex-col justify-between p-3 shadow-sm z-10 ">
      <div className="flex-col  space-y-4 ">
        {generalNavigation.map((item) => (
          <Link href={item.href}>
            <a
              key={item.name}
              className={classNames(
                item.current
                  ? "bg-blue-200 text-blue-600   "
                  : "text-gray-500  ",
                " flex items-center  p-3 rounded-lg border border-transparent text-center   transition-all     hover:bg-gray-100  "
              )}
            >
              <item.icon
                className={
                  "h-6 w-6 flex-shrink-0 transition-colors " +
                  (props.wideNav ? " mr-3 " : " group-hover:mr-3")
                }
                aria-hidden="true"
              />
              <span
                className={props.wideNav ? " flex" : " hidden group-hover:flex"}
              >
                {item.name}
              </span>
            </a>
          </Link>
        ))}
      </div>

      <div>
        <button
          onClick={() => {
            signOut(auth);
          }}
          className={classNames(
            " flex items-center  p-3 rounded-lg border border-transparent text-center  text-gray-400 transition-all     hover:bg-gray-100  "
          )}
        >
          <LogoutIcon
            className={"h-6 w-6 flex-shrink-0 transition-colors "}
            aria-hidden="true"
          />
        </button>
      </div>
    </nav>
  );
}
