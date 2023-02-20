import prisma from '../../../lib/prisma';
import { validateRoute } from '../../../lib/auth';
import { Prisma } from '@prisma/client';

export default validateRoute(async (req, res, user) => {
  const { id: playlistId, favorite } = req.body;

  try {
    await prisma.playlist.update({
      where: { id: playlistId },
      data: {
        likes: favorite ? { increment: 1 } : { decrement: 1 },
        savedBy: favorite
          ? { connect: { id: user.id } } // save the playlist to user's saved list
          : { disconnect: { id: user.id } }, // remove the playlist from user's saved list
      },
    });

    return res
      .status(201)
      .json({ message: 'Added the playlist to your library' });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ error: "Playlist don't exists." });
    }

    return res.status(500).json({ error: 'Server Error' });
  }
});
