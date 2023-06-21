import prisma from '../../../../lib/prisma';
import { validateRoute } from '../../../../lib/auth';
import { Prisma } from '@prisma/client';

export default validateRoute(async (req, res) => {
  const { data } = req.body;

  const id = data.id;
  delete data.id;

  try {
    await prisma.playlist.update({
      where: { id },
      data,
    });

    return res.status(201).json({
      message: 'Playlist updated.',
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ error: "Playlist don't exists." });
    }

    return res.status(500).json({ error: 'Server Error! Try again later!' });
  }
});
