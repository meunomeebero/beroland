import { PrismaClient } from "@prisma/client";
import { api } from "../../../services/api";

export class TradeAchievementsForLootsService {
  constructor(
    private readonly prismaClient: PrismaClient,
  ) {}

  public async execute({ token, achievementId }) {
    const me = await api.getMe(token);

    if (!me) {
      throw new Error('Unauthorized');
    }

    const achievement = await this.prismaClient.achievements.findFirst({
      where: { id: achievementId },
    });

    if (!achievement) {
      throw new Error('Achievement not found');
    }

    const userAchievement = await this.prismaClient.usersAchievements.findFirst({
      where: { userId: me.id, achievementId, isUsed: false },
    });

    if (!userAchievement) {
      throw new Error('User does not have this achievement');
    }

    const promises = Array.from({ length: achievement.value }, (_,i) => i).map(async (i) => {
      const loot = await this.prismaClient.loots.create({
        data: {
          isUsed: false,
          firstClaimedBy: me.id,
          description: `User ${me.id} has traded achievement ${achievementId} for loot ${i}`,
          isGift: true,
          location: 'trade-achievements-for-loots',
          title: String(achievementId),
        },
      });

      await this.prismaClient.usersLoots.create({
        data: {
          userId: me.id,
          lootId: loot.id,
        },
      });
    })

    await Promise.all(promises);

    await this.prismaClient.usersAchievements.update({
      where: {
        id: userAchievement.id,
      },
      data: {
        isUsed: true,
      },
    });

    return { success: true, createdLoots: achievement.value  }
  }
}
