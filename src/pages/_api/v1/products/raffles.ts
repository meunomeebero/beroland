import { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../_prisma";

export const getRaffles = async () => {
  return prismaClient.raffle.findMany({
    where: {
      isOpen: true,
    },
    include: {
      _count: {
        select: {
          tickets: true,
        }
      }
    }
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const updatedUser = await getRaffles();
      res.status(200).json(updatedUser);
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
}
