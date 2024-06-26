import { FlexProps } from "@chakra-ui/react";
import { IconType } from "react-icons";

export enum SocialIcon {
  YouTube = 'youtube',
  Instagram = 'instagram',
  TikTok = 'tiktok',
  Discord = 'discord',
  File = 'file',
}

export class SocialData {
  link: string;
  fallbackLink?: string;
  title: string;
  content: string;
  id: number;
  icon: SocialIcon;

  constructor(data: Partial<SocialData>) {
    Object.assign(this, data);
  }
};

export interface SocialProps {
  containerProps?: FlexProps;
  icon: SocialIcon;
  isDraggable?: boolean;
  data: SocialData;
}
