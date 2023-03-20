import { NextPage } from "next";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import { Header, Navigation } from "@components/index";
import { ReactNode } from "react";
interface AppLayoutProps {
  children: ReactNode;
}
const AppLayout: NextPage<AppLayoutProps> = ({ children }) => {
  return (
    <div className="h-full flex overflow-hidden dark:bg-black">
      <Head>
        <title>screenshotify | app</title>
      </Head>
      <ToastContainer
        position="bottom-right"
        className="text-sm"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
        pauseOnHover
      />
      <div className="fixed w-full z-10 ">
        <Header />
      </div>
      {/* <div className=" pt-20 dark:bg-black dark:border-zinc-900 dark:border-r sm:block hidden h-screen ">
        <Navigation wideNav={false} />
      </div> */}
      <div className="flex-1 h-full pt-16">{children}</div>
    </div>
  );
};

export default AppLayout;
