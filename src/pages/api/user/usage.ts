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
// async function aggregateUsage(docs) {
//   const keys = await Promise.all(
//     docs.map(async (doc) => {
//       const data = doc.data();
//       const key = doc.id;
//       const count = await getCount(firestore.collection("API_KEYS").doc(key));
//       return { ...data, key, usage: count };
//     })
//   );
//   return keys
// }

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const userRef = firestore.collection("users").doc(req.uid);
  const doc = await userRef.get();

  if (!doc.exists) {
    res.status(404).json({ message: "user does not exist"});
  } else {
    const usage = await getCount(userRef);
    const docData = doc.data();
    const data = {...docData, usage};
    res.status(200).json({ message: "usage found", data });
  }
}
export default withAuth(handler);