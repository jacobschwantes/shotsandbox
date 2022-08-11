import type { NextPage } from "next";
import Editor from "@modules/editor/Editor";
import { ToastContainer } from "react-toastify";

const Home: NextPage = () => {
  return (
    <>
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
      <Editor />
    </>
  );
};

export default Home;
