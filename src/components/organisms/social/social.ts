import { FlexProps } from "@chakra-ui/react";
import { IconType } from "react-icons";

export interface SocialProps {
  containerProps?: FlexProps;
  icon: IconType;
  data: {
    link: string;
    fallbackLink?: string;
    title: string;
    content: string;
  };
}
