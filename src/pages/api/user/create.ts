import { withAuth } from '@utils/middlewares'
import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
    name: string
}

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    console.log(req.headers.token)
    res.status(200).json({ name: 'Example' })
}
export default withAuth(handler);