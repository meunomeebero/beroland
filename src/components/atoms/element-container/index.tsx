import {  Flex, Stack } from "@chakra-ui/react";
import { useMemo } from "react";
import { containerUp } from "../../../styles/animations";
import { ChakraDiv } from "../chakra-div";
import { ElementContainerProps } from "./element-container-props";

export function ElementContainer({
  children,
  stackProps,
  rightSide,
  leftSide,
  size,
  isAnimationOff,
  ...props
}: ElementContainerProps) {
  const counterSize = useMemo(() => {
    const sizeValues = { md: { minH: 32 }, sm: { minH: 24 } };
    return sizeValues[size];
  }, [size]);

  return (
    <Flex
      as={ChakraDiv}
      p="4"
      bg="gray.800"
      borderRadius="md"
      minH={counterSize.minH}
      w="100%"
      maxW={598}
      transition="initial"
      {...(containerUp)}
      {...props}
    >
      {rightSide && rightSide}
      <Stack width="100%" spacing="4" ml={["0", "4"]} overflow="hidden" px="4" {...stackProps}>
        {children}
      </Stack>
      {leftSide && leftSide}
    </Flex>
  );
}
