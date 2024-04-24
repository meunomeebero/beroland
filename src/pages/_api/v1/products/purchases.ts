import { NextApiRequest, NextApiResponse } from "next";
import { PurchaseType } from "../../_dtos";
import { handleApiError } from "../../_error";
import { prismaClient } from "../../_prisma";
import { CreatePurchaseService } from "../../_services/create-purchase-service";
import { CreateRaffleTicketService } from "../../_services/create-raffle-ticket-service";

const createPurchaseService = new CreatePurchaseService(prismaClient);
const createRaffleTicketService = new CreateRaffleTicketService(prismaClient);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'POST':
        const { token, rewardId, type, raffleId } = req.body;

        if (type === PurchaseType.TICKET) {
          const ticket = await createRaffleTicketService.execute({ token, raffleId });
          return res.status(201).json(ticket);
        } else if (type === PurchaseType.REWARD) {
          const purchase = await createPurchaseService.execute({ token, rewardId });
          return res.status(201).json(purchase);
        }
        break;
      default:
        res.status(405).json({ error: 'Method not allowed' });
        break;
    }
  } catch (err) {
    handleApiError(err, res);
  }
}
