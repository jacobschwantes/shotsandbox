import "../common/styles/globals.css";
import type { AppProps } from "next/app";
import {
  useAuthState,
  useSendEmailVerification,
} from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";
import { getAuth, signOut } from "firebase/auth";
import { firebaseApp } from "../modules/auth/firebase/client";
import Login from "@modules/auth/login";
import { useRouter } from "next/router";
import AppLayout from "@layouts/AppLayout";
import { useEffect, useState } from "react";
import ProgressBar from "@badrap/bar-of-progress";
import { useIdToken } from "src/common/hooks/auth";
import Spinner from "@components/Spinner";
import Image from "next/image";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { LogoutIcon, XIcon, CheckCircleIcon } from "@heroicons/react/outline";
import Tooltip from "@components/Tooltip";
import { getFunctions, httpsCallable } from "firebase/functions";
const progress = new ProgressBar({
  size: 2,
  color: "#6366f1",
  className: "bar-of-progress",
  delay: 100,
});
const auth = getAuth(firebaseApp);
const functions = getFunctions(firebaseApp);
const sendEmailVerification = httpsCallable(functions, "sendNewVerificationEmail");
function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading, error] = useAuthState(auth);
  const [sendingEmail, setSendingEmail] = useState(false);
  const token = useIdToken();
  // const [token, setToken] = useState('');
  const router = useRouter();
  // user?.getIdToken().then((res) => setToken(res))
  useEffect(() => {
    router.events.on("routeChangeStart", progress.start);
    router.events.on("routeChangeError", progress.finish);
    router.events.on("routeChangeComplete", progress.finish);
  }, [router.events]);
  const logout = () => {
    signOut(auth);
  };
  const handleSendEmailVerification = () => {
    setSendingEmail(true);
    sendEmailVerification()
      .then((result) => {
        const data = result.data;
        setSendingEmail(false);
        toast(
          <div className="flex items-center space-x-3">
            <CheckCircleIcon className="h-6 w-6 text-blue-500" />
            <span>
              <p className="text-sm font-extralight">
                Email verification sent to {user?.email}.
              </p>
            </span>
          </div>,
          {
            theme: "dark",
            progressClassName: "toastProgressBlue",
          }
        );
      })
      .catch((e: any) =>
     { setSendingEmail(false);
        toast(
          <div className="flex items-center space-x-3">
            <span>
              <h1 className=" font-medium">{e.error}</h1>
              <p className="text-sm font-extralight">{e.message}</p>
            </span>
          </div>,
          {
            type: "error",
          }
        )}
      );
  };
  if (router.asPath.includes("_auth")) {
    return <Component {...pageProps} />;
  }
  if (router.asPath.includes("editor")) {
    return <Component {...pageProps} />;
  }
  if (user?.emailVerified && !error) {
    return (
      <AppLayout>
        <Component user={user} idToken={token} {...pageProps} />
      </AppLayout>
    );
  } else if (!user && !loading) {
    return <Login />;
  } else if (user && !user?.emailVerified) {
    return (
      <div className="flex h-screen w-screen items-center justify-center dark:bg-black  ">
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
        <div className="border border-zinc-900 rounded-2xl p-10 max-w-lg w-full space-y-14">
          <div className="flex justify-between items-center">
            <h1 className="text-gray-100 text-3xl font-medium">
              screenshotify
            </h1>
            <Tooltip label="logout">
              <button onClick={logout}>
                <LogoutIcon className="h-6 w-6 text-white" />
              </button>
            </Tooltip>
          </div>
          <div className=" space-y-4">
            <h1 className="text-gray-100 text-3xl font-bold">
              Verify your email
            </h1>
            <p className="text-zinc-400 font-medium text-sm">
              An email has been sent to {user.email} with a link to verify your
              account. If you have not recieved the email after a few minutes,
              please check your spam folder.
            </p>
          </div>
          <div className="space-y-3">
            <button
              onClick={handleSendEmailVerification}
              className="bg-blue-500 hover:bg-blue-400 w-full border border-blue-900 p-4 rounded-lg font-medium tracking-wide text-zinc-100 flex items-center justify-center"
            >
              Resend Email {sendingEmail && <Spinner className="h-5 w-5" />}
            </button>
            <a
              href="mailto:support@screenshotify.io"
              className=" hover:bg-gray-900 hover:bg-opacity-30 w-full border border-zinc-800 p-4 rounded-lg font-medium tracking-wide text-gray-100 flex items-center justify-center"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex h-screen w-screen items-center justify-center dark:bg-black  ">
        <img src="/loading.svg"></img>
      </div>
    );
  }
}

export default MyApp;
