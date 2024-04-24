import { NextApiRequest, NextApiResponse } from "next";
import { api } from "../../../../services/api";
import { UserWithLootsDTO } from "../../_dtos";
import { prismaClient } from "../../_prisma";
import { handleApiError, HttpError, HttpErrorCodes } from "../../_error";
import { eventsWorker } from "../../_services/events-worker";

export enum Achievements {
  POPULAR = 10,
  INFLUENCER = 11,
  QUICK_TRIGGER = 7,
}

type GetUserWithLootsParams = {
  page?: number;
  userName?: string;
  id?: number;
}

// TODO: refactor
export const getUsersWithLoots = async ({ page, userName, id }: GetUserWithLootsParams = { page: 1}) => {
  if (id) {
    const userHasLoot = await prismaClient.usersLoots.findFirst({
      where : {
        userId: id,
      }
    });

    if (!userHasLoot) {
      await prismaClient.usersLoots.create({
        data: {
          userId: id,
          lootId: 1,
        }
      });
    }
  }

  const users = await prismaClient.users.findMany({
    where: {
        loots: {
          some: {
            loot: {
              firstClaimedBy: {
                not: null,
              }
            }
          }
        },
        ...( userName && { name: { contains: userName }}),
        ...( id && { id })
    },
    include: {
      achievements: {
        include: {
          achievement: true,
        }
      },
      loots: {
        include: {
          loot: {
            select: {
              code: true,
              firstClaimedBy: true,
              location: true,
              title: true,
              isUsed: true,
            }
          }
        }
      }
    },
    ...(!userName && !id && { skip: (page - 1) * 10, take: 10 }),
    orderBy: {
      loots: {
        _count: 'desc',
      }
    }
  });

  const userWithLootsDTO = users.map(({ loots, ...user }) => {
    const data = loots.reduce((acc, {loot}) => {
      if (loot.firstClaimedBy === user.id && !loot.isUsed) {
        acc.gems += 1;
        acc.points += 10;
      } else {
        acc.points += 10;
      }

      return acc;
    }, { gems: 0, points: 0 });

    return new UserWithLootsDTO({
      ...user,
      points: data.points,
      gems: data.gems,
      claims: loots.map(({loot}) => ({ firstClaimedBy: loot.firstClaimedBy })),
      achievements: user.achievements,
    })
  });

  const userWithLootsSorted = userWithLootsDTO.sort((a, b) => b.points - a.points);

  return userWithLootsSorted;
}

// TODO: refactor
const claimLoot = async ({ token, code }: { token: string, code: string }) => {
  const user = await api.getMe(token);
  const userId = user.id;

  const loot = await prismaClient.loots.findFirst({
    where: {
      code,
    },
  });

  if (!loot) {
    throw new HttpError({
      message: 'Esse código não existe!',
      statusCode: HttpErrorCodes.NOT_FOUND,
    });
  }

  const userLoot = await prismaClient.usersLoots.findFirst({
    where: {
      userId,
      lootId: loot.id,
    },
  });

  if (userLoot) {
    throw new HttpError({ message: 'Loot já coletado', statusCode: HttpErrorCodes.BAD_REQUEST });
  }

  if (loot.isGift) {
    const myLoots = await prismaClient.usersLoots.count({
      where: {
        userId,
      },
    });

    if (myLoots > 1) {
      throw new HttpError({ message: 'O gift code só pode ser usado como primeiro loot', statusCode: HttpErrorCodes.BAD_REQUEST });
    }
  }

  const createdUserLoot = await prismaClient.usersLoots.create({
    data: {
      userId,
      lootId: loot.id,
    },
  });

  await eventsWorker.add(userId, 'loot_collected');

  // returns --
  if (loot.firstClaimedBy === null) {
    await prismaClient.loots.update({
      where: {
        id: loot.id,
      },
      data: {
        firstClaimedBy: userId,
      },
    });

    return { ...createdUserLoot, isFirstClaim: true }
  }

  return { ...createdUserLoot };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const { page, userName, id } = req.query;
        const users = await getUsersWithLoots({
          page: +page,
          userName: userName as string,
          id: +id,
        });
        res.status(200).json(users);
      } catch (err) {
        await handleApiError(err, res);
      }

      break;
    case 'POST':
      const userLoot = await claimLoot(req.body);
      res.status(201).json(userLoot);
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
}
