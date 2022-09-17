import { withAuth } from "@utils/middlewares";
import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "@modules/auth/firebase/admin";
import { UserConfig } from "@customTypes/global";
interface Data extends Partial<UserConfig> {
  message: string;
}

interface ApiRequest extends NextApiRequest {
  uid: string;
  email: string;
  email_verified: boolean;
}

async function handler(req: ApiRequest, res: NextApiResponse<Data>) {
  const userRef = firestore.collection("users").doc(req.uid);
  if (req.method === "GET") {
    const userDoc = await userRef.get();
    const userInfo = userDoc.data();
    if (!userDoc.exists) {
      res.status(404).json({ message: "user not found" });
    } else {
      res.status(200).json({ ...userInfo, message: "found preferences" });
    }
  } else if (req.method === "PUT") {
    const options = req.body;
    const updateRes = await userRef.update({ preferences: options });
    if (updateRes) {
      res.status(200).json({ message: "updated settings" });
    } else res.status(500).send({ message: "unexpected error occured" });
  } else {
    res.status(500).json({ message: "invalid method" });
  }
}
export default withAuth(handler);
