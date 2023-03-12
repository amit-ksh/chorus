import prisma from '../../../../lib/prisma';

export default async (req, res) => {
  const playlists = await prisma.playlist.findMany();

  res.json(playlists);
};
