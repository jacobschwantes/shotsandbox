import { auth } from '@utils/firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
export function withAuth(handler: any) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).end("Not authenticated");
      const token = authHeader.split(' ')[1];
  
      const { uid, email } = await auth.verifyIdToken(token);
      if (!uid || !email) {
        return res.status(401).end("Not a valid user");
      }
  
      return handler({ ...req, uid, email }, res);
    };
  }