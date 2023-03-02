import prisma from '../../../lib/prisma';
import { validateRoute } from '../../../lib/auth';
import { Prisma } from '@prisma/client';

export default validateRoute(async (req, res) => {
  const { data } = req.body;

  const id = data.id;
  delete data.id;

  if (data?.name) {
    const [firstName, lastName] = data.name.split(' ');
    data.firstName = firstName;
    data.lastName = lastName;

    delete data.name;
  }

  try {
    await prisma.user.update({
      where: { id },
      data,
    });

    return res.status(201).json({
      message: 'User updated.',
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({ error: "User don't exists." });
    }

    return res.status(500).json({ error: 'Server Error! Try agian later!' });
  }
});
