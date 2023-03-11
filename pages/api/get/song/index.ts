import prisma from '../../../../lib/prisma';

export default async (req, res) => {
  const songs = await prisma.song.findMany();

  res.json(songs);
};
