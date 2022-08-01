import "../common/styles/globals.css";
import type { AppProps } from "next/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import {firebaseApp} from "../modules/auth/firebase/clientApp";
import Login from "@modules/auth/login";
import { useRouter } from "next/router";
import AppLayout from "@layouts/AppLayout";
import { useEffect, useState } from "react";
import ProgressBar from "@badrap/bar-of-progress";
import { useIdToken } from "src/common/hooks/auth";
const progress = new ProgressBar({
  size: 2,
  color: "#6366f1",
  className: "bar-of-progress",
  delay: 100,
});
const auth = getAuth(firebaseApp);

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading, error] = useAuthState(auth);
  const token = useIdToken()
  // const [token, setToken] = useState('');
  const router = useRouter();
  // user?.getIdToken().then((res) => setToken(res))
  useEffect(() => {
    router.events.on("routeChangeStart", progress.start);
    router.events.on("routeChangeError", progress.finish);
    router.events.on("routeChangeComplete", progress.finish);
  }, [router.events]);

  if (user && !error) {
    return (
      <AppLayout>
        <Component user={user} idToken={token} {...pageProps} />
      </AppLayout>
    );
  } else if (!user && !loading) {
    return <Login/>;
  } else {
    return (
      <div className="flex h-screen w-screen items-center justify-center dark:bg-black  ">
        <img src="/loading.svg"></img>
      </div>
    );
  }
}

export default MyApp;
