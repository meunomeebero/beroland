# LLM Context for Beroland Project

This document provides context for LLM assistants working with the Beroland project, focusing on key components modified and their interactions.

## Important Files and Components

### Theme System

#### `/src/components/molecules/theme-toggle/index.tsx`
- **Purpose**: Button component to toggle between light and dark themes
- **Key Props**: `position` (object with top, left, right, bottom properties)
- **State Management**: Uses `useTheme` hook to access and modify theme state
- **DOM Interactions**: Updates HTML data-theme attribute and dispatches custom events
- **Notable Functions**: `handleToggleTheme()` to toggle theme and synchronize with DOM
- **Style Considerations**: Uses theme-dependent styles for background and icon color

#### `/src/pages/_app.tsx`
- **Purpose**: Main application wrapper with theme integration
- **Key Components**: 
  - `ThemeSync`: Component that syncs theme state with DOM attributes
  - `ColorModeScript`: Chakra UI component for initial color mode
- **Providers**: Wraps app in ChakraProvider and QueryClientProvider
- **Theme Integration**: Uses custom theme defined in `/src/styles/theme.ts`

#### `/src/styles/theme.ts`
- **Purpose**: Defines theme tokens, colors, and styles for the application
- **Key Objects**: 
  - `themeTokens`: Semantic design tokens for light/dark themes
  - `notion`: Light theme color palette
  - `dracula`: Dark theme color palette
- **Theme Configuration**: Sets initial color mode to 'light'
- **Global Styles**: Defines CSS variables for theme tokens

### Content Components

#### `/src/components/templates/content.tsx`
- **Purpose**: Main component that renders appropriate content based on type
- **Key Enum**: `ContentType` with available content types (SOCIAL, IFRAME, AFFILIATE, etc.)
- **Props Interface**: `ContentProps` extends `BaseContentProps` with type, data, and additional props
- **Component Selection**: Uses `getComponent()` function to render appropriate component
- **API Integration**: Uses `useApi` hook for element deletion
- **Deletion Handling**: Provides UI for element deletion with trash icon

#### `/src/components/organisms/text/index.tsx`
- **Purpose**: Renders text content with different data formats
- **Props**: `TextProps` extends `BaseContentProps` with data property
- **Data Handling**: Accepts multiple data formats (string, object with text/title/content)
- **Styling**: Uses theme tokens for consistent appearance
- **Debug Helpers**: Includes console logging for troubleshooting

#### `/src/components/organisms/markdown/index.tsx`
- **Purpose**: Renders markdown content with inline editing support
- **Props**: `MarkdownProps` with isDraggable, isEditing, and data properties
- **State**: Manages isEditable state and content
- **API Integration**: Updates element data through useApi hook
- **Conditional Rendering**: Shows editable textarea or rendered markdown based on state
- **Draggable Support**: Conditionally wraps content in Draggable component

### Link Component

#### `/src/components/atoms/link/index.tsx`
- **Purpose**: Encapsulates NextLink for consistent link handling
- **Props**: `LinkProps` extends NextLinkProps with additional properties
- **NextJS Integration**: Uses Next.js Link component with appropriate props passing

#### `/src/components/atoms/link/link-props.ts`
- **Purpose**: Type definitions for Link component
- **Key Interface**: `LinkProps` extending NextLinkProps with children, target, and aProps

### API Hook

#### `/src/hooks/useApi.ts`
- **Purpose**: Custom hook for API interactions
- **Key Functions**: 
  - `createElement`: Creates new content elements
  - `updateElement`: Updates existing elements
  - `deleteElement`: Removes elements
- **State Management**: Tracks loading and error states
- **Error Handling**: Provides consistent error formatting
- **Type Safety**: Uses generic types for flexibility

## Recent Fixes and Optimizations

1. **Theme Toggle Fix**: Removed direct DOM style manipulation that caused render issues
2. **ThemeSync Simplification**: Removed MutationObserver and simplified theme synchronization
3. **Link Component Update**: Updated to use newer Next.js Link API format
4. **Text Component Enhancement**: Improved data format handling for more robust rendering
5. **Comment Translation**: Translated all Portuguese comments to English for better maintainability

## Application Structure

- **Atomic Design**: Components follow atomic design principles (atoms, molecules, organisms, templates)
- **Custom Hooks**: Centralized in `/src/hooks/` directory
- **Theme System**: Custom theme integration with Chakra UI
- **Content Types**: Modular content rendering system based on content type enum
- **API Integration**: Frontend communicates with backend API for CRUD operations

## Components That Need Attention

- **ThemeToggle**: Monitor for any theme synchronization issues
- **Text Component**: Watch for data format inconsistencies
- **Content Rendering**: Check for proper typing and data handling
- **Markdown Component**: Verify edit mode functionality

## Code Patterns to Maintain

1. Use theme tokens for consistent styling
2. Implement proper TypeScript interfaces for props
3. Use consistent error handling patterns
4. Follow atomic design component organization
5. Keep comments in English for better maintainability
