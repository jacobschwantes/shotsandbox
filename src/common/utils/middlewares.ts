import { auth } from '@utils/firebase-admin';
import { parseCookies } from 'nookies';
import { NextApiRequest, NextApiResponse } from 'next';
export function withAuth(handler: any) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const authHeader = req.headers.authorization;
  console.log(authHeader)
      if (!authHeader) return res.status(401).end("Not authenticated");
  
      const { uid, email } = await auth.verifyIdToken(authHeader);
  
      if (!uid || !email) {
        return res.status(401).end("Not a valid user");
      }
  
      return handler({ ...req, uid, email }, res);
    };
  }