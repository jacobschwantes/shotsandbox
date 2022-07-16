import { NextPage } from "next";
import { getAuth } from "firebase/auth";
import firebaseApp from "@modules/auth/firebase/clientApp";

const Dashboard: NextPage = () => {
  const auth = getAuth(firebaseApp);
 
  const processFetch = async () => {
    const authToken = await auth.currentUser?.getIdToken()
    const res = await fetch("/api/user/create", {

        headers: { Authorization: `Bearer ${authToken}` },
    })
      .then((res) => console.log(res))
      .catch((e) => console.log("error, ", e));
  };
  return (
    <>
      <h1>dashboard</h1>
      <button
        onClick={() => processFetch()}
        className="bg-gray-400 p-2  rounded-lg text-white font-medium"
      >
        fetch
      </button>
    </>
  );
};

export default Dashboard;
