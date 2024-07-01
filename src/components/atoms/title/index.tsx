import { Text } from "@chakra-ui/react";

export function Title({ children }) {
  return (
    <Text color="gray.50" fontWeight="bold" fontSize="xl" w="80%" mx="auto" p="6" textAlign="center" opacity="0.6">
      {children}
    </Text>
  );
}
