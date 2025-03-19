import { Button, Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { useCallback } from "react";
import { FaTrash } from "react-icons/fa";

// Hooks personalizados
import { useTheme, useApi } from "../../hooks";

// Tipos compartilhados
import { BaseContentProps } from "../../types/content";

// Componentes de conteúdo
import { Affiliate } from "../organisms/affiliate";
import { Banner } from "../organisms/banner";
import { Divider } from "../organisms/divider";
import { Section } from "../organisms/section";
import { Social } from "../organisms/social"
import { Text } from "../organisms/text";
import { YoutubeIframe } from "../organisms/youtube-iframe";
import { Markdown } from "../organisms/markdown";

/**
 * Tipos de conteúdo disponíveis na aplicação
 */
export enum ContentType {
  Social = 'SOCIAL',
  Iframe = 'IFRAME',
  Affiliate = 'AFFILIATE',
  Section = 'SECTION',
  BANNER = "BANNER",
  TEXT = 'TEXT',
  DIVIDER = 'DIVIDER',
  MARKDOWN = 'MARKDOWN',
}

/**
 * Interface de props para o componente Content
 */
export interface ContentProps extends BaseContentProps {
  /** Tipo do conteúdo sendo renderizado */
  type: ContentType | string;

  /** Dados do elemento */
  data: any;

  /** Propriedades adicionais específicas de cada tipo */
  [key: string]: any;
}

/**
 * Componente que renderiza o tipo de conteúdo apropriado com base nas props
 */
export function Content(props: ContentProps) {
  const theme = useTheme();

  // Cores específicas para o botão de exclusão
  const trashIconColor = useColorModeValue(theme.accent.secondary, theme.accent.primary);

  // Importar o hook da API
  const api = useApi();

  /**
   * Remove o elemento através da API
   */
  const deleteElement = useCallback(async () => {
    if (!props.dbId || !props.reload) return;

    await api.deleteElement(props.dbId, () => {
      if (props.reload) {
        props.reload();
      }
    });
  }, [api, props.dbId, props.reload]);

  /**
   * Retorna o componente apropriado baseado no tipo
   */
  function getComponent() {
    // Para garantir que a comparação funcione tanto com strings quanto com enum
    const typeStr = String(props.type);

    switch (typeStr) {
      case String(ContentType.Social):
      case 'SOCIAL':
        return <Social {...props}/>
      case String(ContentType.Iframe):
      case 'IFRAME':
        return <YoutubeIframe {...props}/>
      case String(ContentType.Affiliate):
      case 'AFFILIATE':
        return <Affiliate {...props}/>
      case String(ContentType.Section):
      case 'SECTION':
        return <Section {...props}/>
      case String(ContentType.BANNER):
      case 'BANNER':
        return <Banner {...props}/>
      case String(ContentType.TEXT):
      case 'TEXT':
        return <Text {...props}/>
      case String(ContentType.DIVIDER):
      case 'DIVIDER':
        return <Divider {...props}/>
      case String(ContentType.MARKDOWN):
      case 'MARKDOWN':
        return <Markdown {...props}/>
      default:
        return null;
    }
  }

  return !props.isDeleting ? getComponent() : (
    <Flex w="100%" position="relative" align="center" justify="center">
      <Button
        position="absolute"
        my="auto"
        left="-14"
        onClick={deleteElement}
        variant="ghost"
        _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
      >
        <Icon as={FaTrash} color={trashIconColor}/>
      </Button>
      {getComponent()}
    </Flex>
  );
}
