import { withAuth } from "@utils/middlewares";
import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "@utils/firebase-admin";
type Data = {
  message: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const userRef = firestore.collection("users").doc(req.uid);
  const doc = await userRef.get();
  if (!doc.exists) {
    // TODO create user doc with uid as document id
    try {
      const data = {
        quota: 200
      };

      // Add a new document in collection "cities" with ID 'LA'
      const userWriteRes = await firestore.collection("users").doc(req.uid).set(data);
      res.status(200).json({message: 'user document created'});
    } catch (e: any) {
      res.status(500).json({ message: e });
    }
  } else {
    res.status(400).json({ message: "user document already exists" });
  }
}
export default withAuth(handler);
