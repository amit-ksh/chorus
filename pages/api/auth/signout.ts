import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  req.cookies.CHORUS_ACCESS_TOKEN = '';
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('CHORUS_ACCESS_TOKEN', '', {
      maxAge: -1,
      path: '/',
    })
  );
  res.send({});
};
