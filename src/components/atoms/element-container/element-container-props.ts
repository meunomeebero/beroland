import { FlexProps, StackProps } from "@chakra-ui/react";
import { ReactElement } from "react";

export interface ElementContainerProps extends FlexProps {
  stackProps?: StackProps;
  children: ReactElement[] | ReactElement;
  rightSide?: ReactElement[] | ReactElement;
  leftSide?: ReactElement[] | ReactElement;
  size: 'sm' | 'md';
  isAnimationOff?: boolean;
}
