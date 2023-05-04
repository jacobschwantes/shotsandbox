import {
  CogIcon,
  KeyIcon,
  ChartBarIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
interface NavigationProps {
  wideNav: boolean;
}
export default function Navigation({ wideNav }: NavigationProps) {
  const router = useRouter();
  const generalNavigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: ChartBarIcon,
      current: router.asPath === "/",
    },
    {
      name: "Tokens",
      href: "/tokens",
      icon: KeyIcon,
      current: router.asPath.includes("tokens"),
    },
    {
      name: "History",
      href: "/history",
      icon: ArchiveBoxIcon,
      current: router.asPath.includes("history"),
    },
    {
      name: "Settings",
      href: "/settings/account",
      icon: CogIcon,
      current: router.asPath.includes("settings"),
    },
  ];

  return (
    <nav className=" flex flex-col justify-between p-3 z-10 h-full  ">
      <div className="flex-col  space-y-4 ">
        {generalNavigation.map((item, index) => (
          <Link key={index} href={item.href}>
            <a
              key={item.name}
              className={clsx(
                item.current
                  ? "bg-sky-200 text-sky-600     "
                  : "text-gray-300  ",
                " flex items-center  p-3 rounded-lg border border-transparent text-center transition-all  hover:bg-gray-100   "
              )}
            >
              <item.icon
                className={
                  "h-6 w-6 flex-shrink-0 transition-colors " +
                  (wideNav ? " mr-3 " : " group-hover:mr-3")
                }
                aria-hidden="true"
              />
              <span className={wideNav ? " flex" : " hidden group-hover:flex"}>
                {item.name}
              </span>
            </a>
          </Link>
        ))}
      </div>

      <div>
      </div>
    </nav>
  );
}
