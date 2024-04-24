import { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../_prisma";

export function getLastVideo() {
  return prismaClient.videos.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      const lastVideo = await getLastVideo();

      res.status(200).json({ lastVideo });
      break;
    default:
      res.status(405).end(); //Method Not Allowed
      break;
  }
}
