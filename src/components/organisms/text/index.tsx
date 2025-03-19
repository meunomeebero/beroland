import { Draggable } from "../../atoms/draggable";
import { Box, Text as CText } from "@chakra-ui/react";
import { BaseContentProps } from "../../../types/content";
import { useTheme } from "../../../hooks/useTheme";

/**
 * Interface for Text component props
 */
interface TextProps extends BaseContentProps {
  data: any;
}

/**
 * Text component that displays formatted text content
 */
export function Text({
  isDraggable = false,
  data
}: TextProps) {
  // Extract values with fallbacks to prevent errors
  // Handle different data formats - sometimes data itself might be the text
  const id = data?.id || 0;
  let content = '';

  // Try multiple possible formats for the text content
  if (typeof data === 'string') {
    content = data;
  } else if (data?.text) {
    content = data.text;
  } else if (data?.title) {
    content = data.title;
  } else if (data?.content) {
    content = data.content;
  }

  // Use the theme hook for semantic token access
  const theme = useTheme();

  // Debug output to help troubleshoot
  console.log('Text component rendering with data:', data, 'Content:', content);

  const NormalComponent = (
    <Box
      w="100%"
      mr="auto"
      bg="transparent"
    >
      <CText
        color={theme.text.primary}
        fontWeight="md"
        fontSize="lg"
      >
        {content || 'No text content available'}
      </CText>
    </Box>
  );

  return !isDraggable ? NormalComponent : (
    <Draggable id={id}>
      {NormalComponent}
    </Draggable>
  );
}
