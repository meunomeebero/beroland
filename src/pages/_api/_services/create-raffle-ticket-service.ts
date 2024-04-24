import { paymentType, PrismaClient } from "@prisma/client";
import { api } from "../../../services/api";

type CreateRaffleTicketParams = {
  token: string;
  raffleId: number;
};

export class CreateRaffleTicketService {
  constructor(
    private readonly prismaClient: PrismaClient,
  ) {}

  public async execute({ token, raffleId }: CreateRaffleTicketParams) {
    const me = await api.getMe(token);

    if (!me) {
      throw new Error('Unauthorized');
    }

    const reward = await this.prismaClient.raffle.findFirst({
      where: { id: raffleId },
    });

    if (!reward) {
      throw new Error('Raffle not found');
    }

    const userLoots = await this.prismaClient.usersLoots.findMany({
      where: { userId: me.id },
      select: { loot: true }
    });

    const notUsedLoots = userLoots.filter(ul => !ul.loot.isUsed && ul.loot.firstClaimedBy === me.id);

    if (notUsedLoots.length < reward.price) {
      throw new Error('Not enough gems');
    }

    const gemsToUser = notUsedLoots.slice(0, reward.price);

    await this.prismaClient.loots.updateMany({
      where: {
        id: {
          in: gemsToUser.map(ul => ul.loot.id)
        }
      },
      data: {
        isUsed: true
      }
    });

    const ticket = await this.prismaClient.raffleTickets.create({
      data: {
        raffleId,
        userId: me.id,
      },
    });

    return ticket;
  }
}
