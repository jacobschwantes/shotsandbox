import type { NextPage } from "next";
import Editor from "@modules/editor/Editor";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import { useRouter } from "next/router";
import { db } from "src/db";
import { useLiveQuery } from "dexie-react-hooks";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import clsx from "clsx";
import Loader from "@components/Loader";
const Home: NextPage = ({}) => {
  const router = useRouter();
  const { pid } = router.query;
  const [projectId, setProjectId] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (typeof pid === "string") {
      router.isReady && setProjectId(parseInt(pid));
    }
  }, [router.isReady]);
  const project = useLiveQuery(
    () => db.projects.get({ id: projectId }),
    [projectId],
    false
  );
  return (
    <>
      <Head>
        <title>ShotSandbox - Editor</title>
      </Head>

      <div>
        <div
          className={clsx(
            "absolute z-50 inset-0 flex flex-col items-center justify-center bg-white",
           !loading && "hidden"
          )}
        >
         <Loader/>
        </div>

        {project && <Editor setLoading={setLoading} project={project} />}
      </div>
    </>
  );
};

export default Home;
