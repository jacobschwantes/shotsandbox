import { withAuth } from "@utils/middlewares";
import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "@utils/firebase-admin";
const crypto = require("crypto");
type Data = {
  message: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const key = req.body.key;
  const keyRef = firestore.collection("API_KEYS").doc(key);

  if (key) {
    try {
      await keyRef.delete();
      res.status(200).json({ message: "key deleted" });
    } catch (e: any) {
      res.status(500).json({ message: e });
    }
  } else {
    res.status(400).json({ message: "no key sent" });
  }
}
export default withAuth(handler);
