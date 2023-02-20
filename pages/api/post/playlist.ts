import prisma from '../../../lib/prisma';
import { validateRoute } from '../../../lib/auth';

export default validateRoute(async (req, res, user) => {
  const playlist = await prisma.playlist.create({
    data: {
      name: req.playlist.name,
      likes: req.playlist.likes,
      user: {
        connect: { id: user.id },
      },
      songs: {
        connect: req.playlist?.songs.map((song) => ({ id: song.id })) || [],
      },
    },
  });

  res.json(playlist);
});
