import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.headers.cookie)
    return res.status(200).json({ success: true, host: req.headers.host })
}
