import { withAuth } from "@utils/middlewares";
import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "@utils/firebase-admin";
const crypto = require("crypto");
type Data = {
  message: string;
};
const generateKey = () => {
  const rand = crypto.randomBytes(20);
  const unique_id = rand.toString("hex");
  console.log(unique_id);
  return unique_id;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const key = generateKey();
  const userRef = firestore.collection("API_KEYS").doc(key);
  const doc = await userRef.get();
  if (!doc.exists) {
    // TODO create user doc with uid as document id
    try {
      const data = {
        quota: 200,
        name: `token${Math.floor(Math.random() * 100)}`,
        userid: req.uid
      };

      // Add a new document in collection "cities" with ID 'LA'
      const userWriteRes = await firestore
        .collection("API_KEYS")
        .doc(key)
        .set(data);
      res.status(200).json({ message: "key created", key: {quota: 200, userid: req.uid, key, usage: 0, name: data.name} });
    } catch (e: any) {
      res.status(500).json({ message: e });
    }
  } else {
    res.status(400).json({ message: "key already exists" });
  }
}
export default withAuth(handler);
