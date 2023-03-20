import type { NextPage } from "next";
import Editor from "@modules/editor/Editor";
import { ToastContainer } from "react-toastify";
import Head from "next/head";
import { useRouter } from "next/router";
import { db } from "src/db";
import { useLiveQuery } from "dexie-react-hooks";
import Image from "next/image";
const Home: NextPage = ({}) => {
  const router = useRouter();
  const { pid } = router.query;
  const project = useLiveQuery(async () => {
    return (
      typeof pid === "string" && (await db.projects.get({ id: parseInt(pid) }))
    );
  });
  return (
    <>
      <Head>
        <title>ShotSandbox - Editor</title>
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
      {project ? (
        <Editor project={project} />
      ) : (
        <div className="flex h-screen w-screen items-center justify-center dark:bg-black  ">
          <Image
            alt="loading animation"
            height={100}
            width={100}
            src="/loading.svg"
          />
        </div>
      )}
    </>
  );
};

export default Home;
