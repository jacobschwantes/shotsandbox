import { NextPage } from "next";
import { getAuth } from "firebase/auth";
import firebaseApp from "@modules/auth/firebase/clientApp";
import { Card } from "@components/index";
import { useAsync } from "react-async-hook";
import { useState } from "react";
const Dashboard: NextPage = () => {
  const auth = getAuth(firebaseApp);
  const [usage, setUsage] = useState('')
  const asyncHero = useAsync(async () => {
    if (false) {
      console.log("was loading");
      return [];
    } else {
      console.log("we is fetching");
      return processFetch()
    }
  }, []);
  const processFetch = async () => {
    const authToken = await auth.currentUser?.getIdToken();
    const res = await fetch("/api/user/usage", {
      headers: { Authorization: `Bearer ${authToken}` },
    })
      .then((res) => res.json())
      .then(data => setUsage(data.data))
      .catch((e) => console.log("error, ", e));
  };
  return (
    <div className="max-w-3xl w-full p-5">
      <div className="grid grid-cols-3 gap-4  ">
        <Card title="Requests" type="count" count={usage.usage} change={5.2} />
        <Card title="Requests" type="count" count={usage.usage} change={5.2} />
        <Card title="Requests" type="count" count={usage.usage} change={5.2} />
      </div>
    </div>
  );
};

export default Dashboard;
