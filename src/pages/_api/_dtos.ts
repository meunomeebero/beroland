import { Achievements, UsersAchievements } from "@prisma/client";

export enum PurchaseType {
  TICKET = 'ticket',
  REWARD = 'reward',
}

export class LootDTO {
  firstClaimedBy: number;
}

type UserAchievementsWithAchievements = UsersAchievements & {
  achievement: Achievements;
}

export class UserWithLootsDTO {
  id: number;
  name: string;
  email: string;
  coverURL?: string;
  github: string;
  image: string;
  role: string;
  bio: string;
  points: number;
  gems: number;
  claims: Array<LootDTO>;
  createdAt: Date;
  updatedAt: Date;
  achievements: UserAchievementsWithAchievements[]

  constructor(data: Partial<UserWithLootsDTO>) {
    Object.assign(this, data);
  }
}

export class UserDailyAnnotationsDTO {
  date: Date;
  groups: Array<{
    id: number;
    title: string;
    content: any;
  }>;

  constructor(data: Partial<UserDailyAnnotationsDTO>) {
    Object.assign(this, data);
  }
}
