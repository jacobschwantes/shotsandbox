import "@styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import AppLayout from "@layouts/AppLayout";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Script
        defer
        data-domain="shotsandbox.com"
        src="http://analytics.endeavorwebsolutions.com/js/script.js"
      />
      {router.asPath.includes("editor") ? (
        <>
          <ToastContainer
            position="bottom-right"
            className="text-sm"
            autoClose={2000}
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
      ) : (
        <>
          <ToastContainer
            position="bottom-right"
            className="text-sm"
            autoClose={2000}
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
      )}
    </>
  );
}

export default MyApp;
