import { PrismaClient } from "@prisma/client";
import { api } from "../../../services/api";

type DeleteCommentParams = {
  commentId: number;
  token: string;
}

export class DeleteProfileCommentService {
  constructor(
    private readonly prismaClient: PrismaClient,
  ) {}

  public async execute({ commentId, token }: DeleteCommentParams) {
    const me = await api.getMe(token);

    if (!me) {
      throw new Error('Unauthorized');
    }

    const comment = await this.prismaClient.userProfileComments.findFirst({
      where: { id: commentId },
    });

    if (!comment) {
      throw new Error('comment not found');
    }

    if (
      comment.commentUserId !== me.id &&
      comment.profileUserId !== me.id &&
      me.role !== 'ADMIN'
    ) {
      throw new Error('Unauthorized');
    }

    await this.prismaClient.userProfileComments.delete({
      where: { id: commentId },
    });

    return { ok: true };
  }
}
