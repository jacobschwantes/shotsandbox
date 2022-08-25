import type { NextPage } from "next";
import Editor from "@modules/editor/Editor";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
const Home: NextPage = () => {
  return (
    <>
     <Head>
        <title>screenshotify | editor</title>
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
      <Editor />
    </>
  );
};

export default Home;
