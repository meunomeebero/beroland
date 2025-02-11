import { Box } from "@chakra-ui/react";
import { markdown } from "../../utils/markdown";
import { Draggable } from "../atoms/draggable";

interface MarkdownProps {
  isDraggable?: boolean;
  data: {
    id: number;
    content: string;
  };
}

export function Markdown({ isDraggable, data: { id, content } }: MarkdownProps) {
  const NormalComponent = (
    <Box w="100%" mr="auto">
      <Box
        className="markdown-content"
        color="gray.50"
        fontSize="lg"
        dangerouslySetInnerHTML={{ __html: markdown.render(content) }}
      />
    </Box>
  );

  return !isDraggable ? NormalComponent : (
    <Draggable id={id}>
      {NormalComponent}
    </Draggable>
  );
}
