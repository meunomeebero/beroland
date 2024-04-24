import { paymentType, PrismaClient } from "@prisma/client";
import { api } from "../../../services/api";
import { HttpError, HttpErrorCodes } from "../_error";
import { eventsWorker } from "./events-worker";

type CreatePurchaseParams = {
  token: string;
  rewardId: number;
};

export class CreatePurchaseService {
  constructor(
    private readonly prismaClient: PrismaClient,
  ) {}

  public async execute({ token, rewardId }: CreatePurchaseParams) {
    const me = await api.getMe(token);

    if (!me) {
      throw new Error('Unauthorized');
    }

    const reward = await this.prismaClient.rewards.findFirst({
      where: { id: rewardId },
    });

    if (!reward) {
      throw new HttpError({ message: 'Produto não encontrado!', statusCode: HttpErrorCodes.NOT_FOUND });
    }

    if (reward.stock === 0) {
      throw new HttpError({ message: 'Produto não possui estoque', statusCode: HttpErrorCodes.BAD_REQUEST });
    }

    const userLoots = await this.prismaClient.usersLoots.findMany({
      where: { userId: me.id },
      select: { loot: true }
    });

    if (reward.paymentType === paymentType.GEM) {
      const notUsedLoots = userLoots.filter(ul => !ul.loot.isUsed && ul.loot.firstClaimedBy === me.id);

      if (notUsedLoots.length < reward.price) {
        throw new HttpError({ message: 'Você não possui loot o suficiente para executar essa operação!', statusCode: HttpErrorCodes.BAD_REQUEST });
      }

      const gemsToUser = notUsedLoots.slice(0, reward.price);

      await this.prismaClient.loots.updateMany({
        where: {
          id: {
            in: gemsToUser.map(ul => ul.loot.id)
          }
        },
        data: {
          isUsed: true,
          updatedAt: new Date(),
        }
      });
    } else if (userLoots.length * 10 < reward.price) {
      throw new HttpError({ message: 'Você não possui loot o suficiente para executar essa operação!', statusCode: HttpErrorCodes.BAD_REQUEST });
    }

    const purchase = await this.prismaClient.usersRewardPurchases.create({
      data: {
        rewardId,
        userId: me.id,
      },
    });

    await this.prismaClient.rewards.update({
      where: {
        id: rewardId,
      },
      data: {
        stock: reward.stock - 1,
        updatedAt: new Date(),
      },
    });

    await eventsWorker.add(me.id, "reward_collected")

    return purchase;
  }
}
