import { NextPage } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header, Navigation } from "@components/index";
import { ReactNode } from "react";
interface AppLayoutProps {
  children: ReactNode
}
const AppLayout: NextPage<AppLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
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
      <Header />
      <div className="flex flex-1 h-full">
        <Navigation active="projects" wideNav={false} />
        <div className="overflow-y-auto flex-1 h-full ">{children}</div>
        <div className=" bg-white"></div>
      </div>
    </div>
  );
};

export default AppLayout;
