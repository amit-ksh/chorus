import prisma from '../../../lib/prisma';
import { validateRoute } from '../../../lib/auth';
import { Prisma } from '@prisma/client';

export default validateRoute(async (req, res) => {
  const { playlist } = req.body;

  const id = playlist.id;
  delete playlist.id;

  try {
    await prisma.playlist.update({
      where: { id },
      data: { ...playlist },
    });

    return res.status(201).json({
      message: 'Playlist updated.',
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ error: "Playlist don't exists." });
    }

    return res.status(500).json({ error: 'Server Error! Try agian later!', e });
  }
});
