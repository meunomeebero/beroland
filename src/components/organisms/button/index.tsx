import { Box, Text } from "@chakra-ui/react";
import { Link } from "../../atoms/link";
import { BaseContentProps } from "../../../types/content";
import { useTheme } from "../../../hooks/useTheme";
import { useCallback } from "react";

interface ButtonProps extends BaseContentProps {
  data: {
    text: string;
    url: string;
  };
}

export function Button({ data }: ButtonProps) {
  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!data || !data.text || !data.url) return;

    const urlDomain = new URL(data.url).hostname;

    e.preventDefault();
    window?.["datafast"]?.(`click_${urlDomain}`, { description: `Someone clicked on the button ${data.url}` });
    window.open(data.url, '_blank');
  }, [data]);

  if (!data || !data.text || !data.url) {
    return null;
  }

  return (
    <Box _hover={{ opacity: 0.8, transition: "2s" }} textAlign="center" my={4} bg="purple.400" w="100%" p={3} borderRadius="sm">
      <Text color="gray.900" fontWeight="medium" onClick={handleClick} cursor="pointer">
        {data.text}
      </Text>
    </Box>
  );
}
