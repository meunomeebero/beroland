import { Box } from "@chakra-ui/react";
import { useMemo } from "react";
import { useTheme } from "../../../hooks/useTheme";
import { Draggable } from "../../atoms/draggable";
import { Title } from "../../atoms/title";

// Definição da interface de props para melhor tipagem
interface SectionProps {
  isDraggable?: boolean;
  data: any;  // Para compatibilidade, na prática será { id: string | number; title: string; }
  type?: string;  // Para compatibilidade com ContentProps
  dbId?: number;  // Para compatibilidade com ContentProps
  reload?: (data?: any) => void;  // Para compatibilidade com ContentProps
  isEditing?: boolean;  // Para compatibilidade com ContentProps
  isDeleting?: boolean;  // Para compatibilidade com ContentProps
}

/**
 * Componente de seção que exibe um título com suporte a formatação especial.
 * Marcadores **texto** são destacados com fundo colorido.
 */
export function Section({ isDraggable = false, data }: SectionProps) {
  // Extrair valores com fallbacks para evitar erros
  const { id = 0, title = '' } = data || {};
  const theme = useTheme();
  
  // Usando o token de design diretamente do nosso sistema de temas
  const highlightBackground = theme.border.primary;

  // Processamento do título com destaque para textos entre **
  const formattedTitle = useMemo(() => {
    const regex = /\*\*(.*?)\*\*/g;
    const matches = title.matchAll(regex);
    let formatted = title;
    
    for (const match of matches) {
      const [full, text] = match;
      formatted = formatted.replace(
        full, 
        `<span style="background: ${highlightBackground}; margin: 0 0.1rem; padding: 0 0.2rem; border-radius: 2px;">${text}</span>`
      );
    }
    
    return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
  }, [title, highlightBackground]);

  // Componente de título com formatação aplicada
  const SectionContent = (
    <Box w="100%" mr="auto">
      <Title>
        {formattedTitle}
      </Title>
    </Box>
  );

  // Renderiza com ou sem funcionalidade de arrastar
  return !isDraggable ? SectionContent : (
    <Draggable id={id}>
      {SectionContent}
    </Draggable>
  );
}
