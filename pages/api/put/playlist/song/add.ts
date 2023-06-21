import prisma from '../../../../../lib/prisma';
import { validateRoute } from '../../../../../lib/auth';
import { Prisma } from '@prisma/client';

export default validateRoute(async (req, res) => {
  const { playlistId, songId } = req.body;

  try {
    const playlist = await prisma.playlist.update({
      where: { id: playlistId },
      data: {
        songs: {
          connect: {
            id: songId,
          },
        },
      },
    });

    return res.status(201).json({
      message: `Added the song to your ${playlist.name}`,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ error: "Playlist don't exists." });
    }

    return res.status(500).json({ error: 'Server Error! Try again later' });
  }
});
