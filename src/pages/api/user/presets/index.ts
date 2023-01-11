import { withAuth } from "@utils/middlewares";
import type { NextApiRequest, NextApiResponse } from "next";
import { firestore } from "@modules/auth/firebase/admin";
import { Config } from "@customTypes/configs";
type Data = {
  message: string;
  presets?: any[];
};
type Preset = {
  id: string;
  userid: string;
  name: string;
  config: Config;
};
interface ApiRequest extends NextApiRequest {
  uid: string;
  email: string;
  email_verified: boolean;
}
async function handler(req: ApiRequest, res: NextApiResponse<Data>) {
  const presetsRef = firestore.collection("presets");
  const method = req.method;
  switch (method) {
    case "GET":
      const snapshot = await presetsRef.where("userid", "==", req.uid).get();
      if (snapshot.empty) {
        res.status(200).json({ message: "user has no presets", presets: [] });
      } else {
        const presets: Preset[] = [];
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          presets.push({ ...data, id });
        });
        res.status(200).json({ message: "presets found", presets });
      }
      break;
    default:
      res.status(400).json({ message: "invalid request method" });
      break;
  }
}
export default withAuth(handler);
