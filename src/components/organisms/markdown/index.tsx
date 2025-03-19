import { Box, Textarea, Icon, Flex, useColorModeValue } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { FaGripVertical } from "react-icons/fa";

// Hooks personalizados
import { useTheme, useApi } from "../../../hooks";

// Componentes
import { Draggable } from "../../atoms/draggable";

// Utilitários
import { markdown } from "../../../utils/markdown";

// Tipagem
import { MarkdownProps } from "./markdown-props";

/**
 * Componente de Markdown com suporte a edição inline
 */
export function Markdown({ isDraggable, isEditing, data }: MarkdownProps) {
  const theme = useTheme();
  const [isEditable, setIsEditable] = useState(false);
  const [content, setContent] = useState(data.content);

  // Estilos baseados no tema
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.50");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Utilizando o hook da API
  const api = useApi();
  
  // Lida com atualização do conteúdo quando o usuário termina a edição
  const handleUpdate = useCallback(async () => {
    await api.updateElement(
      data.dbId,
      {
        content,
        component: 'MARKDOWN',
        order: data.order
      },
      () => setIsEditable(false)
    );
  }, [api, data.dbId, content, data.order]);

  // Componente de conteúdo Markdown (editável ou somente leitura)
  const MarkdownContent = (
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
              bg={bgColor}
              color={textColor}
              p="4"
              borderRadius="md"
              borderColor={borderColor}
              autoFocus
              rows={content.split('\n').length}
            />
          ) : (
            <Box
              className="markdown-content"
              color={textColor}
              fontSize="lg"
              bg={bgColor}
              p="4"
              borderRadius="md"
              borderWidth="1px"
              borderColor={borderColor}
              dangerouslySetInnerHTML={{ __html: markdown.render(content) }}
            />
          )}
        </Box>
      )}
      {!isEditing && (
        <Box
          className="markdown-content"
          color={textColor}
          fontSize="lg"
          bg={bgColor}
          p="4"
          borderRadius="md"
          borderWidth="1px"
          borderColor={borderColor}
          dangerouslySetInnerHTML={{ __html: markdown.render(content) }}
        />
      )}
    </Box>
  );

  // Renderiza com ou sem funcionalidade de arrastar
  return !isDraggable ? MarkdownContent : (
    <Draggable id={data.id}>
      <Flex w="100%" position="relative" align="flex-start">
        <Box
          position="absolute"
          left="-8"
          top="4"
          cursor="grab"
          _active={{ cursor: "grabbing" }}
        >
          <Icon as={FaGripVertical} color={theme.accent.secondary} boxSize="5"/>
        </Box>
        {MarkdownContent}
      </Flex>
    </Draggable>
  );
}