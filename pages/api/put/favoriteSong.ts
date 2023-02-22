import prisma from '../../../lib/prisma';
import { validateRoute } from '../../../lib/auth';

export default validateRoute(async (req, res, user) => {
  const { id: songId, favorite } = req.body;

  try {
    const { favoritePlaylistId } = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        favoritePlaylistId: true,
      },
    });

    let favPlaylist = { id: favoritePlaylistId };
    if (!favPlaylist.id) {
      favPlaylist = await prisma.playlist.create({
        data: {
          name: 'Favorite Songs',
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    }

    favPlaylist = await prisma.playlist.update({
      where: { id: favPlaylist.id },
      data: {
        songs: favorite
          ? {
              connect: { id: songId },
              update: {
                where: {
                  id: songId,
                },
                data: {
                  likes: { increment: 1 },
                },
              },
            }
          : {
              // first update the song's likes, then disconnect
              // the song from playlist
              update: {
                where: {
                  id: songId,
                },
                data: {
                  likes: { decrement: 1 },
                },
              },
              disconnect: { id: songId },
            },
        user: {
          update: {
            favoritePlaylistId: favPlaylist.id,
          },
        },
      },
    });

    return res.status(201).json({
      message: `${favorite ? 'Added' : 'Removed'} the  song ${
        favorite ? 'to' : 'from'
      } your library`,
    });
  } catch (e) {
    console.error(e.message);

    return res.status(500).json({ error: 'Server Error' });
  }
});
