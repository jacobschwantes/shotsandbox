import { NextPage } from "next";
import Link from "next/link";
import {Header, Navigation} from "@components/index"
import {
  BookOpenIcon,
  ChipIcon,
  CreditCardIcon,
  DownloadIcon,
  MenuIcon,
  XIcon,
  CogIcon
} from "@heroicons/react/outline";
const navigation = [
  { name: "Pricing", href: "/pricing", icon: CreditCardIcon },
  { name: "Download", href: "/download", icon: DownloadIcon },
  { name: "Docs", href: "#", icon: BookOpenIcon },
  { name: "App", href: "#", icon: ChipIcon },
];
const AppLayout: NextPage = ({ children }) => {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <Header />
      <div className="flex flex-1">
        {/* <div className="  bg-white h-screen px-4 py-2 ">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <a className="px-3 py-2 rounded-md  flex items-center justify-center hover:bg-gray-100">
                <item.icon width={'2rem'} height={'2rem'} />
              </a>
            </Link>
          ))}
        </div> */}
        <Navigation active="projects" wideNav={false}  />
        {children}
        <div className=" bg-white"></div>
      </div>
    </div>
  );
};

export default AppLayout;
