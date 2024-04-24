import { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../_prisma";

export const getRewards = async () => {
  const rewards = await prismaClient.rewards.findMany({
    include: {
      sponsor: true,
    }
  });
  return rewards;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const updatedUser = await getRewards();
      res.status(200).json(updatedUser);
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
}
