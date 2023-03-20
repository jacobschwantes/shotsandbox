import "../common/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import AppLayout from "@layouts/AppLayout";
import { useEffect, useState } from "react";
import ProgressBar from "@badrap/bar-of-progress";
const progress = new ProgressBar({
  size: 2,
  color: "#1de2dd",
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
    return <Component {...pageProps} />;
  } else {
    return (
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    );
  }
}

export default MyApp;
