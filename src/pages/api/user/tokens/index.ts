import { withAuth } from "@utils/middlewares";
import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "@utils/firebase-admin";
type Data = {
  message: string;
};
async function getCount(docRef) {
  const querySnapshot = await docRef.collection("usage").get();
  const documents = querySnapshot.docs;
  let count = 0;
  for (const doc of documents) {
    count += doc.get("count");
  }
  return count;
}
async function aggregateUsage(docs) {
  const keys = await Promise.all(
    docs.map(async (doc) => {
      const data = doc.data();
      const key = doc.id;
      const count = await getCount(firestore.collection("API_KEYS").doc(key));
      return { ...data, key, usage: count };
    })
  );
  return keys
}

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const tokensRef = firestore.collection("API_KEYS");
  const snapshot = await tokensRef.where("userid", "==", req.uid).get();

  if (snapshot.empty) {
    // TODO create user doc with uid as document id
    res.status(200).json({ message: "user has no api keys", keys: [] });
  } else {
    const start = Date.now()
    const keys = await aggregateUsage(snapshot.docs)
    res.status(200).json({ message: "keys found", keys });
  }
}
export default withAuth(handler);
