import { NextApiRequest, NextApiResponse } from "next";
import { api } from "../../../../services/api";
import { prismaClient } from "../../_prisma";

export type UserCredits = {
  gem: number;
  points: number;
}

const getUserCredits = async ({ token }): Promise<UserCredits> => {
  const user = await api.getMe(token);

  if (!user) {
    throw new Error('Unauthorized');
  }

  const points = await prismaClient.usersLoots.findMany({
    where: {
      userId: user.id,
    },
    select: {
      loot: {
        select: {
          firstClaimedBy: true,
          isUsed: true,
        }
      }
    }
  });

  const data = points.reduce((acc, { loot }) => {
    if (loot.firstClaimedBy === user.id && !loot.isUsed) {
      acc.gem += 1;
      acc.points += 10;
    } else {
      acc.points += 10;
    }

    return acc;
  }, { gem: 0, points: 0 });

  return data;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { token } = req.query;
      const updatedUser = await getUserCredits({ token });
      res.status(200).json(updatedUser);
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
}
