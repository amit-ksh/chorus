import prisma from '../../../lib/prisma';
import { validateRoute } from '../../../lib/auth';

export default validateRoute(async (req, res, user) => {
  const { playlists } = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      playlists: {
        orderBy: {
          name: 'asc',
        },
      },
    },
  });

  res.json(playlists);
});
