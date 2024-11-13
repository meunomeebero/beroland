import { Text } from "@chakra-ui/react";

export function Title({ children, ...props }) {
  return (
    <Text color="gray.50" lineHeight="7" fontWeight="bold" fontSize="2xl" {...props}>
      {children}
    </Text>
  );
}
