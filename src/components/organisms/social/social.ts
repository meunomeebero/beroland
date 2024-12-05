import { FlexProps } from "@chakra-ui/react";
import { IconType } from "react-icons";

export enum SocialIcon {
  YouTube = 'YouTube',
  Instagram = 'Instagram',
  TikTok = 'TikTok',
  Discord = 'Discord',
  Twitter = 'Twitter',
  File = 'File',
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
  isEditing?: boolean;
  containerProps?: FlexProps;
  icon: SocialIcon;
  isDraggable?: boolean;
  isDeleting?: boolean;
  data: SocialData;
}
