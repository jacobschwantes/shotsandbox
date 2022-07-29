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
  return unique_id;
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const tokensRef = firestore.collection("API_KEYS");
  const method = req.method;
  switch (method) {
    case "GET":
      const snapshot = await tokensRef.where("userid", "==", req.uid).get();
      if (snapshot.empty) {
        res.status(200).json({ message: "user has no api keys", keys: [] });
      } else {
        const keys = [];
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          const key = doc.id;
          keys.push({ ...data, key });
        });
        res.status(200).json({ message: "keys found", keys });
      }
      break;
    case "POST":
      if (!req.email_verified) {
        res.status(401).send("email not verified");
      } else {
        const newKey = generateKey();
        const userRef = firestore.collection("API_KEYS").doc(newKey);
        const doc = await userRef.get();

        if (!doc.exists) {
          // TODO create user doc with uid as document id
          const snapshot = await tokensRef.where("userid", "==", req.uid).get();
          if (snapshot.size < 5) {
            try {
              const data = {
                quota: 200,
                name: `token${Math.floor(Math.random() * 100)}`,
                userid: req.uid,
                locked: false,
                quota_limit: "limited",
              };

              // Add a new document in collection "cities" with ID 'LA'
              const userWriteRes = await firestore
                .collection("API_KEYS")
                .doc(newKey)
                .set(data);
              res.status(200).json({
                message: `${data.name} created`,
                key: {
                  ...data,
                  ...{ key: newKey, usage: 0 },
                },
              });
            } catch (e: any) {
              res.status(500).json({ message: e });
            }
          } else {
            res.status(500).json({
              error: "Token creation failed",
              message: "5 token limit reached",
            });
          }
        } else {
          res.status(400).json({ message: "key already exists" });
        }
      }
      break;
    default:
      res.status(400).json({ message: "invalid request method" });
      break;
  }
}
export default withAuth(handler);
