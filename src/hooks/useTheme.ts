import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import { themeTokens } from '../styles/theme';

/**
 * Custom hook to access current theme colors (light/dark)
 * Simplifies access to design tokens semantically
 */
export function useTheme() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  // Helper function to access current theme values
  const getTokenValue = (path: string) => {
    const parts = path.split('.');
    let result: any = isDark 
      ? themeTokens.colors.dark 
      : themeTokens.colors.light;
    
    for (const part of parts) {
      if (result && result[part] !== undefined) {
        result = result[part];
      } else {
        console.warn(`Token not found: ${path}`);
        return undefined;
      }
    }
    
    return result;
  };
  
  return {
    // Color mode information
    colorMode,
    isDark,
    isLight: !isDark,
    toggleColorMode,
    
    // Access to tokens by category
    bg: {
      primary: getTokenValue('bg.primary'),
      secondary: getTokenValue('bg.secondary'),
      darker: getTokenValue('bg.darker'),
    },
    text: {
      primary: getTokenValue('text.primary'),
      secondary: getTokenValue('text.secondary'),
      highlight: getTokenValue('text.highlight'),
    },
    accent: {
      primary: getTokenValue('accent.primary'),
      secondary: getTokenValue('accent.secondary'),
      success: getTokenValue('accent.success'),
      danger: getTokenValue('accent.danger'),
      warning: getTokenValue('accent.warning'),
      info: getTokenValue('accent.info'),
      yellow: getTokenValue('accent.yellow'),
    },
    border: {
      primary: getTokenValue('border.primary'),
      secondary: getTokenValue('border.secondary'),
    },
    
    // Function to generate a value based on mode (similar to useColorModeValue)
    value: <T>(lightValue: T, darkValue: T): T => 
      isDark ? darkValue : lightValue,
  };
}

/**
 * Simplified hook for conditional values based on color mode
 * Alias for Chakra UI's useColorModeValue
 */
export const useThemeValue = useColorModeValue;