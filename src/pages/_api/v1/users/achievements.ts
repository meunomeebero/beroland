import { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../_prisma";

const getUserAchievements = async ({ userId }) => {
  return prismaClient.usersAchievements.findMany({
    where: {
      userId: +userId,
      isUsed: false,
    },
    select: {
      achievement: true,
    }
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { userId } = req.query;
      const updatedUser = await getUserAchievements({ userId });
      res.status(201).json(updatedUser);
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
}
