import { NextPage } from "next";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import { Header, Navigation } from "@components/index";
import { ReactNode, useMemo } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { AdjustmentsIcon, CogIcon, ViewGridAddIcon, ViewGridIcon } from "@heroicons/react/outline";

interface AppLayoutProps {
  children: ReactNode;
}
const AppLayout: NextPage<AppLayoutProps> = ({ children }) => {


  return (
    <div className="h-full flex overflow-hidden dark:bg-black">
      <Head>
        <title>screenshotify | app</title>
      </Head>

      <div className="fixed w-full z-10 ">
        <Header />
      </div>
      {/* <div className=" pt-20 dark:bg-black dark:border-zinc-900 dark:border-r sm:block hidden h-screen ">
        <Navigation wideNav={false} />
      </div> */}

      <div className="flex-1 h-full pt-16 bg-zinc-50">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;


