import { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../_prisma";

export const getAchievements = async () => {
  const achievements = await prismaClient.achievements.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      value: 'asc',
    },
  });
  return achievements;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const achievements = await getAchievements();
      res.status(200).json(achievements);
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
}

