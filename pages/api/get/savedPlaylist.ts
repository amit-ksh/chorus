import prisma from '../../../lib/prisma';
import { validateRoute } from '../../../lib/auth';

export default validateRoute(async (req, res, user) => {
  const { savedPlaylists } = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      savedPlaylists: {
        where: {
          userId: { not: user.id },
        },
        orderBy: {
          name: 'asc',
        },
      },
    },
  });

  res.json(savedPlaylists);
});
