import { NextApiRequest, NextApiResponse } from "next";
import { prismaClient } from "../../../_prisma";
import { CreateProfileCommentService } from "../../../_services/create-profile-comment-service";
import { DeleteProfileCommentService } from "../../../_services/delete-profile-comment-service";

const createProfileCommentService = new CreateProfileCommentService(prismaClient);
const deleteProfileCommentService = new DeleteProfileCommentService(prismaClient);

// TODO: refactor
const getProfileComments = async (profileUserId: number) => {
  const comments = await prismaClient.userProfileComments.findMany({
    where: {
      profileUserId,
    },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          image: true
        }
      }
    }
  });

  return comments;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const data = req.body;
      const comment = await createProfileCommentService.execute(data);
      res.status(201).json(comment);
      break;
    case 'GET':
      const { profileUserId } = req.query;
      const comments = await getProfileComments(+profileUserId);
      res.status(200).json(comments);
      break;
    case 'DELETE':
      const { commentId, token } = req.query as Record<string, string>;
      await deleteProfileCommentService.execute({ commentId: +commentId, token });
      res.status(200).json({ message: 'Comment deleted' });
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
      break;
  }
}
