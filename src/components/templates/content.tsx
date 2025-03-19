import { Button, Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { useCallback } from "react";
import { FaTrash } from "react-icons/fa";

// Custom hooks
import { useTheme, useApi } from "../../hooks";

// Shared types
import { BaseContentProps } from "../../types/content";

// Content components
import { Affiliate } from "../organisms/affiliate";
import { Banner } from "../organisms/banner";
import { Divider } from "../organisms/divider";
import { Section } from "../organisms/section";
import { Social } from "../organisms/social"
import { Text } from "../organisms/text";
import { YoutubeIframe } from "../organisms/youtube-iframe";
import { Markdown } from "../organisms/markdown";
import { Button as ButtonComponent } from "../organisms/button";

/**
 * Content types available in the application
 */
export enum ContentType {
  Social = "SOCIAL",
  Iframe = "IFRAME",
  Affiliate = "AFFILIATE",
  Title = "SECTION",
  Banner = "BANNER",
  Text = "TEXT",
  Divider = "DIVIDER",
  Markdown = "MARKDOWN",
  Button = "BUTTON"
}

/**
 * Props interface for the Content component
 */
export interface ContentProps extends BaseContentProps {
  /** Type of content being rendered */
  type: ContentType | string;

  /** Element data */
  data: any;

  /** Additional properties specific to each type */
  [key: string]: any;
}

/**
 * Component that renders the appropriate content type based on props
 */
export function Content(props: ContentProps) {
  const theme = useTheme();

  // Specific colors for the delete button
  const trashIconColor = useColorModeValue(theme.accent.secondary, theme.accent.primary);

  // Import the API hook
  const api = useApi();

  /**
   * Removes the element through the API
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
   * Returns the appropriate component based on type
   */
  function getComponent() {
    // To ensure comparison works with both strings and enum
    const typeStr = String(props.type);

    switch (typeStr) {
      case String(ContentType.Social):
      case 'SOCIAL':
        return <Social {...props}/>
      case String(ContentType.Iframe):
      case 'IFRAME':
        return <YoutubeIframe {...props}/>
      case String(ContentType.Title):
      case 'SECTION':
        return <Section {...props}/>
      case String(ContentType.Text):
      case 'TEXT':
        return <Text {...props}/>
      case String(ContentType.Divider):
      case 'DIVIDER':
        return <Divider {...props}/>
      case String(ContentType.Markdown):
      case 'MARKDOWN':
        return <Markdown {...props}/>
      case String(ContentType.Button):
      case 'BUTTON':
        return <ButtonComponent {...props}/>
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
