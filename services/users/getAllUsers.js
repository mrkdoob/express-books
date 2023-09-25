import { PrismaClient } from '@prisma/client';

const getAllUsers = async (username) => {
  const prisma = new PrismaClient();

  return prisma.user.findMany({
    where: {
      username,
    },
  });
};

export default getAllUsers;
