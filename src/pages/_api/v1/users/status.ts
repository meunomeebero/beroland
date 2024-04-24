import { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../_prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      const { userId } = req.query as any;

      const user = await prismaClient.users.findFirst({
        where: {
          id: +userId,
          isActive: true,
        },
        select: {
          isActive: true,
        }
      });
      res.status(200).json({ isActive: !!user });
      break;
    default:
      res.status(405).end(); //Method Not Allowed
      break;
  }
}
