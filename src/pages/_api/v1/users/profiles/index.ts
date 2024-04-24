import { Users } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { api } from "../../../../../services/api";
import { handleApiError, HttpError, HttpErrorCodes } from "../../../_error";
import { prismaClient } from "../../../_prisma";

type PatchUserProfile = {
  name?: string;
  image?: string;
  bio?: string;
  token: string;
}

export const patchUserProfile = async ({ name, image, bio, token }: PatchUserProfile) => {
  const me = await api.getMe(token);

  const data = {} as Users;

  if (name) {
    data.name = `@${name.toLowerCase().split(' ').join('_').replaceAll('@', '')}_${me.id}`;
    data.profileName = name;
  }

  if (image) {
    data.image = image;
  }

  if (bio) {
    data.bio = bio;
  }

  if (!me) throw new HttpError({ message: 'Token invalido', statusCode: HttpErrorCodes.UNAUTHORIZED });

  return prismaClient.users.update({
    where: {
      id: me.id,
    },
    data,
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'PATCH':
      try {
        await patchUserProfile(req.body);
        res.status(200).json({ message: 'User profile updated' });
      } catch (err) {
        await handleApiError(err, res);
      }
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
}
