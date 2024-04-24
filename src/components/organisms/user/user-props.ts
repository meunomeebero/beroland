import { FlexProps } from "@chakra-ui/react";
import { UserWithLootsDTO } from "../../../pages/_api/_dtos";

export interface UserProps {
  isSearching: boolean;
  containerProps?: FlexProps;
  position: number;
  data: Partial<UserWithLootsDTO>;
}
