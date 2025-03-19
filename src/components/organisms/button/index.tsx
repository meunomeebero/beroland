import { Box, Text } from "@chakra-ui/react";
import { Link } from "../../atoms/link";
import { BaseContentProps } from "../../../types/content";
import { useTheme } from "../../../hooks/useTheme";

interface ButtonProps extends BaseContentProps {
  data: {
    text: string;
    url: string;
  };
}

export function Button({ data }: ButtonProps) {
  const theme = useTheme();

  if (!data || !data.text || !data.url) {
    return null;
  }

  return (
    <Box _hover={{ opacity: 0.8, transition: "2s" }} textAlign="center" my={4} bg="purple.400" w="100%" p={3} borderRadius="sm">
      <Link
        href={data.url}
        target="_blank"
      >
        <Text color="gray.900" fontWeight="medium">
          {data.text}
        </Text>
      </Link>
    </Box>
  );
}
