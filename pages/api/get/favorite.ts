import { NextApiRequest, NextApiResponse } from 'next';
import { validateRoute } from '../../../lib/auth';
import prisma from '../../../lib/prisma';

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user) => {
    const { songs } = await prisma.playlist.findUnique({
      where: { id: user.favoritePlaylistId },
      include: {
        songs: {
          include: {
            artist: {
              select: { name: true, songs: { include: { artist: true } } },
            },
          },
        },
      },
    });

    res.json({ songs });
  }
);
