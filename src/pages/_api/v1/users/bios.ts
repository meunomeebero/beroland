import { NextApiRequest, NextApiResponse } from "next";
import { api } from "../../../../services/api";
import { prismaClient } from "../../_prisma";

const updateBio = async ({ token, bio }) => {
  const user = await api.getMe(token);

  if (!user) {
    throw new Error('Unauthorized');
  }

  const updatedUser = await prismaClient.users.update({
    where: {
      id: user.id,
    },
    data: {
      bio,
    },
  });

  return updatedUser;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'PATCH':
      const { token, bio } = req.body;
      const updatedUser = await updateBio({ token, bio });
      res.status(201).json(updatedUser);
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
}
