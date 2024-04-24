import { Users } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { api } from "../../../../services/api";
import { prismaClient } from "../../_prisma";
import crypto from 'crypto';

const createUserGiftLoot = async ({ token }) => {
  const user = await api.getMe(token) as Users;

  const alreadyCreatedUserGiftLoot = await prismaClient.userGiftLoots.findFirst({
    where: {
      userId: user.id,
    },
    include: {
      loot: {
        select: {
          code: true,
        }
      }
    }
  });

  if (alreadyCreatedUserGiftLoot) {
    return alreadyCreatedUserGiftLoot;
  }

  if (!user) {
    throw new Error('Unauthorized');
  }

  const loot = await prismaClient.loots.create({
    data: {
      description: 'Gift',
      location: `Perfil do usuário: ${user.id}`,
      title: `Presente de ${user.name}`,
      isGift: true,
      isUsed: true,
      firstClaimedBy: 1,
      code: crypto.randomBytes(4).toString('hex'),
    }
  })

  const userGiftLoot = await prismaClient.userGiftLoots.create({
    data: {
      lootId: loot.id,
      userId: user.id,
    }
  });

  return { userGiftLoot, loot };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const { token } = req.body;
      const updatedUser = await createUserGiftLoot({ token });
      res.status(201).json(updatedUser);
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
}
