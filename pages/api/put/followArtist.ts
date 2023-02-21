import prisma from '../../../lib/prisma';
import { validateRoute } from '../../../lib/auth';
import { Prisma } from '@prisma/client';

export default validateRoute(async (req, res, user) => {
  const { id: artistId, following } = req.body;

  try {
    const artist = await prisma.artist.update({
      where: { id: artistId },
      data: {
        followers: following
          ? { connect: { id: user.id } } // save the playlist to user's saved list
          : { disconnect: { id: user.id } }, // remove the playlist from user's saved list
      },
    });

    return res.status(201).json({
      message: `You started ${following ? '' : 'un'}following ${artist.name}`,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ error: "Artist don't exists." });
    }

    return res.status(500).json({ error: 'Server Error' });
  }
});
