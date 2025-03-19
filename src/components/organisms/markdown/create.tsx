import { Stack, Button, Text, Textarea, useColorModeValue } from "@chakra-ui/react";
import { useCallback, FormEvent } from "react";
import { ContentType } from "@prisma/client";

// Hooks personalizados
import { useTheme, useApi } from "../../../hooks";

/**
 * Interface de props para o componente de criação de markdown
 */
interface CreateMarkdownProps {
  /** Lista de itens existentes */
  items: any[];
  
  /** Função para atualizar a lista de itens */
  setItems: (items: any) => void;
  
  /** Título da página */
  title: string;
  
  /** Tipo de componente */
  component: string;
}

/**
 * Componente para criar um novo elemento markdown
 */
export function CreateMarkdown({ items, setItems, title, component }: CreateMarkdownProps) {
  const theme = useTheme();
  
  // Estilos baseados no tema
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.500");
  const buttonBgColor = useColorModeValue("white", "gray.700");
  const buttonHoverBgColor = useColorModeValue("gray.100", "gray.600");
  
  // Utilizando o hook da API
  const api = useApi();
  
  /**
   * Lida com a criação de um novo elemento markdown
   */
  const handleCreateElement = useCallback(async (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();

    const eventData = formEvent.target as any;
    const content = eventData.content.value.replace(/\n/g, '  \n'); // Add two spaces before newline for markdown line breaks

    const data = {
      content,
      component,
    };

    // Usando nosso hook de API para criar o elemento
    await api.createElement(
      title,
      component as ContentType,
      data,
      items.length,
      (formattedData) => {
        setItems(items => [...formattedData, ...items]);
        // Limpar o formulário após o envio bem-sucedido
        eventData.reset();
      }
    );
    
    // Se houver erro, ele será tratado internamente pelo hook
  }, [api, items, title, setItems, component]);

  return (
    <form action="submit" onSubmit={handleCreateElement}>
      <Stack spacing="4" alignItems="center" mb="6" w={578}>
        <Textarea
          variant="outline"
          w="100%"
          name="content"
          id="content"
          autoComplete="off"
          borderRadius="md"
          bg={bgColor}
          color={textColor}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          placeholder="Digite o conteúdo em markdown..."
          py="2"
          px="4"
          whiteSpace="pre-wrap"
          _focus={{
            borderColor: theme.accent.primary,
            boxShadow: `0 0 0 1px ${theme.accent.primary}`,
          }}
        />
        <Button 
          variant="solid" 
          w="100%" 
          borderRadius="md" 
          type="submit"
          bg={buttonBgColor}
          _hover={{ bg: buttonHoverBgColor }}
        >
          <Text color={textColor} fontWeight="bold">
            Confirmar
          </Text>
        </Button>
      </Stack>
    </form>
  );
}