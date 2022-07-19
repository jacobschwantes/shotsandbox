import { withAuth } from "@utils/middlewares";
import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "@utils/firebase-admin";
type Data = {
  message: string;
};
// async function getCount(docRef) {
//   const querySnapshot = await docRef.collection("usage").get();
//   const documents = querySnapshot.docs;
//   let count = 0;
//   for (const doc of documents) {
//     count += doc.get("count");
//   }
//   return count;
// }
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

// Use the query for pagination
// ...
async function getCount(docRef) {
  const querySnapshot = await docRef.collection("usage").get();
  const documents = querySnapshot.docs;
  let count = 0;
  for (const doc of documents) {
    count += doc.get("count");
  }
  return count;
}
async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { limit, page } = req.query;
  console.log(limit, page)
  const userRef = firestore.collection("users").doc(req.uid);
  const logCount = await getCount(userRef);
  const startAt = logCount - (parseInt(page) - 1) * parseInt(limit);
  const first = userRef
    .collection("logs")
    .orderBy("id", "desc")
    .startAt(startAt)
    .limit(parseInt(limit));

  const snapshot = await first.get();

  // Construct a new query starting at this document.
  // Note: this will not have the desired effect if multiple
  // cities have the exact same population value.

  if (snapshot.empty) {
    res.status(404).json({ message: "no logs" });
  } else {
    const logs = [];
    snapshot.forEach((doc) => {
      logs.push(doc.data());
    });
    res.status(200).json({ message: "found logs", logs, logCount });
  }
}
export default withAuth(handler);
