import { Text } from "@chakra-ui/react";

export function Title({ children, ...props }) {
  return (
    <Text color="gray.50" lineHeight="7" fontWeight="bold" fontSize="2xl" w="80%" pt="4" {...props}>
      {children}
    </Text>
  );
}
