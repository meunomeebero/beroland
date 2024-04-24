import { NextApiRequest, NextApiResponse } from "next";
import { api } from "../../../../services/api";
import { prismaClient } from "../../_prisma";
import crypto from 'crypto';

export type CreateLootParams = {
  title: string;
  location: string;
  description?: string;
  imageURL?: string;
  token: string;
}

export type GetLootParams = {
  token: string;
}

// TODO: refactor
const createLoot = async ({ token, title, location, description, imageURL }: CreateLootParams) => {
  const me = await api.getMe(token);

  if (!me || me.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  const loot = await prismaClient.loots.create({
    data: {
      code: crypto.randomBytes(4).toString('hex'),
      title,
      location,
      description,
      imageURL,
    },
  });

  return loot;
};

// TODO: refactor
const getLoots = async ({ token }: GetLootParams) => {
  const me = await api.getMe(token);

  if (!me) {
    throw new Error('Unauthorized');
  }

  const loots = await prismaClient.loots.findMany({
    where: {
      isGift: false,
    }
  });

  return loots;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const userLoot = await createLoot(req.body);
      res.status(201).json(userLoot);
      break;
    case 'GET':
      const loots = await getLoots(req.query as GetLootParams);
      res.status(200).json(loots);
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
}
