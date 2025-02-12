import { Box, Textarea, Icon, Flex } from "@chakra-ui/react";
import { markdown } from "../../utils/markdown";
import { Draggable } from "../atoms/draggable";
import axios from "axios";
import { useCallback, useState } from "react";
import { FaGripVertical } from "react-icons/fa";

interface MarkdownProps {
  isDraggable?: boolean;
  isEditing?: boolean;
  data: {
    id: number;
    dbId: number;
    content: string;
    order: number;
  };
}

export function Markdown({ isDraggable, isEditing, data }: MarkdownProps) {
  const [isEditable, setIsEditable] = useState(false);
  const [content, setContent] = useState(data.content);

  const handleUpdate = useCallback(async () => {
    try {
      await axios.patch('/api/elements', {
        id: data.dbId,
        data: {
          content,
          component: 'MARKDOWN',
          order: data.order
        }
      });
      setIsEditable(false);
    } catch (err) {
      console.error(err);
    }
  }, [data.dbId, content, data.order]);

  const Content = (
    <Box w="100%" position="relative">
      {isEditing && (
        <Box
          onClick={() => setIsEditable(true)}
          cursor="pointer"
          position="relative"
        >
          {isEditable ? (
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onBlur={handleUpdate}
              className="markdown-content"
              whiteSpace="pre-wrap"
              w="100%"
              minH="100%"
              bg="gray.800"
              p="4"
              borderRadius="md"
              autoFocus
              rows={content.split('\n').length}
            />
          ) : (
            <Box
              className="markdown-content"
              color="gray.50"
              fontSize="lg"
              bg="gray.800"
              p="4"
              borderRadius="md"
              dangerouslySetInnerHTML={{ __html: markdown.render(content) }}
            />
          )}
        </Box>
      )}
      {!isEditing && (
        <Box
          className="markdown-content"
          color="gray.50"
          fontSize="lg"
          bg="gray.800"
          p="4"
          borderRadius="md"
          dangerouslySetInnerHTML={{ __html: markdown.render(content) }}
        />
      )}
    </Box>
  );

  return !isDraggable ? Content : (
    <Draggable id={data.id}>
      <Flex w="100%" position="relative" align="flex-start">
        <Box
          position="absolute"
          left="-8"
          top="4"
          cursor="grab"
          _active={{ cursor: "grabbing" }}
        >
          <Icon as={FaGripVertical} color="purple.400" boxSize="5"/>
        </Box>
        {Content}
      </Flex>
    </Draggable>
  );
}
