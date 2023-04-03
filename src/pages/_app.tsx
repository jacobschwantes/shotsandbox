
import "@styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import AppLayout from "@layouts/AppLayout";
import { ToastContainer } from "react-toastify";


function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

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
