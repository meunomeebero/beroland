import { PrismaClient } from "@prisma/client";
import { api } from "../../../services/api";

type CreateCommentParams = {
  profileUserId: number;
  token: string;
  content: string;
}

export class CreateProfileCommentService {
  constructor(
    private readonly prismaClient: PrismaClient,
  ) {}

  public async execute({ content, profileUserId, token }: CreateCommentParams) {
    const me = await api.getMe(token);

    if (!me) {
      throw new Error('Unauthorized');
    }

    const profile = await this.prismaClient.users.findFirst({
      where: { id: profileUserId },
    });

    if (!profile) {
      throw new Error('Profile not found');
    }

    const comment = await this.prismaClient.userProfileComments.create({
      data: {
        content,
        profileUserId,
        commentUserId: me.id,
      }
    });

    return comment;
  }
}
