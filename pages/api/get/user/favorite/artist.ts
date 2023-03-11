import prisma from '../../../../../lib/prisma';
import { validateRoute } from '../../../../../lib/auth';

export default validateRoute(async (req, res, user) => {
  const { following: artists } = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
    select: {
      following: {
        orderBy: {
          name: 'asc',
        },
      },
    },
  });

  res.json(artists);
});
