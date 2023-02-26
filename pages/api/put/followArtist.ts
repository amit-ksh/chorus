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
          ? { connect: { id: user.id } } // follow artist
          : { disconnect: { id: user.id } }, // unfollow artist
      },
    });

    return res.status(201).json({
      message: `You ${following ? 'started ' : 'un'}following ${artist.name}`,
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ error: "Artist don't exists." });
    }

    return res.status(500).json({ error: 'Server Error' });
  }
});
