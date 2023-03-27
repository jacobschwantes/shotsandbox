import "react-toastify/dist/ReactToastify.css";
import "@styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import AppLayout from "@layouts/AppLayout";
import { useEffect, useState } from "react";
import ProgressBar from "@badrap/bar-of-progress";
import { ToastContainer } from "react-toastify";
const progress = new ProgressBar({
  size: 2,
  color: "#0ea5e9",
  className: "bar-of-progress",
  delay: 100,
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeStart", progress.start);
    router.events.on("routeChangeError", progress.finish);
    router.events.on("routeChangeComplete", progress.finish);
  }, [router.events]);

  if (router.asPath.includes("editor")) {
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
          pauseOnHover
          theme="light"
        />
        <Component {...pageProps} />
      </>
    );
  } else {
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
          pauseOnHover
          theme="light"
        />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </>
    );
  }
}

export default MyApp;
