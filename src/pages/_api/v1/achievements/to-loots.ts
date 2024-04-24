import { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../_prisma";
import { TradeAchievementsForLootsService } from "../../_services/trade-achievements-for-loots-service";

const tradeAchievementsForLootsService = new TradeAchievementsForLootsService(prismaClient);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const { token, achievementId } = req.body;
      const updatedUser = await tradeAchievementsForLootsService.execute({ token, achievementId });
      res.status(201).json(updatedUser);
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
}
