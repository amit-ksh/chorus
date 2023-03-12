import prisma from '../../../../lib/prisma';

export default async (req, res) => {
  const artists = await prisma.artist.findMany();

  res.json(artists);
};
