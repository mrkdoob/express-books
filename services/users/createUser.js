import { PrismaClient } from '@prisma/client';

const createUser = async (username, password) => {
  const prisma = new PrismaClient();

  return prisma.user.create({
    data: {
      username,
      password,
    },
  });
};

export default createUser;
