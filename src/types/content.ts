import { ContentType } from "../components/templates/content";

/**
 * Common properties for all content components
 */
export interface BaseContentProps {
  /** Element ID in the database */
  dbId?: number;

  /** Flag indicating if the element is in edit mode */
  isEditing?: boolean;

  /** Flag indicating if the element is in delete mode */
  isDeleting?: boolean;

  /** Flag indicating if the element can be dragged */
  isDraggable?: boolean;

  /** Function to reload the elements list */
  reload?: (data?: any) => void;

  /** Content type being rendered (optional here, but required in ContentProps) */
  type?: ContentType | string;
}

/**
 * Interface for basic data common to all content types
 */
export interface BaseContentData {
  /** Element ID */
  id: number | string;
}

/**
 * Mapping interface between content types and their respective props
 * Used for typing specific data in different components
 */
export interface ContentTypeMap {
  [ContentType.Social]: {
    icon?: string;
    content: string;
    link: string;
    title: string;
    fallbackLink?: string;
  };
  [ContentType.Iframe]: {
    videoId: string;
  };
  [ContentType.Affiliate]: {
    link: string;
    text: string;
    highlight: string;
    image: string;
  };
  [ContentType.Title]: {
    title: string;
  };
  [ContentType.Text]: {
    text: string;
  };
  [ContentType.Markdown]: {
    content: string;
  };
  [ContentType.Divider]: Record<string, never>;
  [ContentType.Banner]: {
    title: string;
    subtitle: string;
    image?: string;
  };
  [ContentType.Button]: {
    text: string;
    url: string;
  };
}
