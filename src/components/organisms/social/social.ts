import { FlexProps } from "@chakra-ui/react";
import { IconType } from "react-icons";

export enum SocialIcon {
  YouTube = 'FaYoutube',
  Instagram = 'AiFillInstagram',
  TikTok = 'BsTiktok',
  Discord = 'BsDiscord',
  File = 'FaFile',
}

export interface SocialProps {
  containerProps?: FlexProps;
  icon: SocialIcon;
  isDraggable?: boolean;
  data: {
    link: string;
    fallbackLink?: string;
    title: string;
    content: string;
    id: number;
  };
}
