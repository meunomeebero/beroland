import { extendTheme } from '@chakra-ui/react';

// Definindo sistema de tokens de design semânticos
export const themeTokens = {
  colors: {
    // Light theme tokens (Notion inspired)
    light: {
      bg: {
        darker: '#F5F5F5',
        primary: '#FFFFFF',
        secondary: '#F7F7F7',
      },
      text: {
        primary: '#37352F',
        secondary: '#8F8F8F',
        highlight: '#6940A5',
      },
      accent: {
        primary: '#AD1A72',  // Pink
        secondary: '#6940A5', // Purple
        success: '#0F7B6C',   // Green
        danger: '#E03E3E',    // Red
        warning: '#D9730D',   // Orange
        info: '#148FD8',      // Cyan
        yellow: '#DFAB01',
      },
      border: {
        primary: '#EAEAEA',
        secondary: '#F0F0F0',
      }
    },

    // Dark theme tokens (Dracula inspired)
    dark: {
      bg: {
        darker: '#181818',
        primary: '#1d1e26',
        secondary: '#282a36',
      },
      text: {
        primary: '#f8f8f2',
        secondary: '#6272a4',
        highlight: '#bd93f9',
      },
      accent: {
        primary: '#ff79c6',   // Pink
        secondary: '#bd93f9', // Purple
        success: '#50fa7b',   // Green
        danger: '#ff5555',    // Red
        warning: '#ffb86c',   // Orange
        info: '#8be9fd',      // Cyan
        yellow: '#f1fa8c',
      },
      border: {
        primary: '#44475a',
        secondary: '#383a4a',
      }
    }
  }
};

// Mantendo os objetos originais para compatibilidade com código existente
export const notion = {
  BackgroundDarker: themeTokens.colors.light.bg.darker,
  BackgroundPrimary: themeTokens.colors.light.bg.primary,
  BackgroundSecondary: themeTokens.colors.light.bg.secondary,
  CurrentLine: themeTokens.colors.light.border.primary,
  Comment: themeTokens.colors.light.text.secondary,
  Foreground: themeTokens.colors.light.text.primary,
  Cyan: themeTokens.colors.light.accent.info,
  Green: themeTokens.colors.light.accent.success,
  Orange: themeTokens.colors.light.accent.warning,
  Pink: themeTokens.colors.light.accent.primary,
  Purple: themeTokens.colors.light.accent.secondary,
  Red: themeTokens.colors.light.accent.danger,
  Yellow: themeTokens.colors.light.accent.yellow,
};

export const dracula = {
  BackgroundDarker: themeTokens.colors.dark.bg.darker,
  BackgroundPrimary: themeTokens.colors.dark.bg.primary,
  BackgroundSecondary: themeTokens.colors.dark.bg.secondary,
  CurrentLine: themeTokens.colors.dark.border.primary,
  Comment: themeTokens.colors.dark.text.secondary,
  Foreground: themeTokens.colors.dark.text.primary,
  Cyan: themeTokens.colors.dark.accent.info,
  Green: themeTokens.colors.dark.accent.success,
  Orange: themeTokens.colors.dark.accent.warning,
  Pink: themeTokens.colors.dark.accent.primary,
  Purple: themeTokens.colors.dark.accent.secondary,
  Red: themeTokens.colors.dark.accent.danger,
  Yellow: themeTokens.colors.dark.accent.yellow,
};

export const goldenBorder = {
  position: 'absolute',
  display: 'block',
  top: '-50%',
  left: '-50%',
  zIndex: '-9',
  height: '200%',
  width: '200%',
  transform: 'rotate(-45deg)',
  overflow: 'hidden',
  background: 'linear-gradient(to right, #fff 20%, #fff 40%, #ECD08C 50%, #ECD08C 55%, #fff 70%, #fff 100%',
  backgroundSize: '200% auto',
  animation: 'shine 3s linear infinite',
}

export const simpleHover = {
  filter: 'brightness(0.6)',
  transition: '0.3s',
  cursor: 'pointer'
}

export const simpleHoverWithTranslation = {
  filter: 'brightness(0.8)',
  transition: '0.3s',
  cursor: 'pointer',
  transform: 'translateY(+10px)'
}

export const textGradiant = {
  bgGradient: "linear(to-b, gray.50, transparent)",
  bgClip: "text",
}

// Configuração de cores para o Chakra UI
const chakraColors = {
  // Cores para modo light
  light: {
    gray: {
      950: notion.Foreground,
      900: notion.BackgroundPrimary,
      800: notion.BackgroundSecondary,
      700: notion.CurrentLine,
      600: notion.Comment,
      50: notion.Foreground,
    },
    pink: {
      400: notion.Pink,
      300: '#E1B1CA',
    },
    purple: {
      400: notion.Purple,
    },
    green: {
      400: notion.Green,
    },
    red: {
      400: notion.Red
    }
  },
  // Cores para modo dark
  dark: {
    gray: {
      950: dracula.BackgroundDarker,
      900: dracula.BackgroundPrimary,
      800: dracula.BackgroundSecondary,
      700: dracula.CurrentLine,
      600: dracula.Comment,
      50: dracula.Foreground,
    },
    pink: {
      400: dracula.Pink,
      300: 'rgb(43, 36, 49)',
    },
    purple: {
      400: dracula.Purple,
    },
    green: {
      400: dracula.Green,
    },
    red: {
      400: dracula.Red
    }
  }
};

// Definição do tema para o Chakra UI
export const theme = extendTheme({
  // Configuração do modo de cor
  config: {
    initialColorMode: 'light', // Modo claro como padrão
    useSystemColorMode: false,
  },
  // Estilos globais
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? dracula.BackgroundPrimary : notion.BackgroundPrimary,
        color: props.colorMode === 'dark' ? dracula.Foreground : notion.Foreground,
      },
      // Aplicar as cores corretas no data-theme para o Chakra UI
      ':root': {
        '--chakra-colors-gray-950': notion.Foreground,
        '--chakra-colors-gray-900': notion.BackgroundPrimary,
        '--chakra-colors-gray-800': notion.BackgroundSecondary,
        '--chakra-colors-gray-700': notion.CurrentLine,
        '--chakra-colors-gray-600': notion.Comment,
        '--chakra-colors-gray-50': notion.Foreground,
        '--chakra-colors-pink-400': notion.Pink,
        '--chakra-colors-pink-300': '#F5EFFF',
        '--chakra-colors-purple-400': notion.Purple,
        '--chakra-colors-green-400': notion.Green,
        '--chakra-colors-red-400': notion.Red,
      },
      '[data-theme="dark"]': {
        '--chakra-colors-gray-950': dracula.BackgroundDarker,
        '--chakra-colors-gray-900': dracula.BackgroundPrimary,
        '--chakra-colors-gray-800': dracula.BackgroundSecondary,
        '--chakra-colors-gray-700': dracula.CurrentLine,
        '--chakra-colors-gray-600': dracula.Comment,
        '--chakra-colors-gray-50': dracula.Foreground,
        '--chakra-colors-pink-400': dracula.Pink,
        '--chakra-colors-pink-300': 'rgb(43, 36, 49)',
        '--chakra-colors-purple-400': dracula.Purple,
        '--chakra-colors-green-400': dracula.Green,
        '--chakra-colors-red-400': dracula.Red,
      }
    })
  },
  // Fontes
  fonts: {
    body: 'Nunito',
    heading: 'Nunito',
  },
  // Definindo as cores para cada modo (light/dark)
  semanticTokens: {
    colors: {
      text: {
        default: notion.Foreground,
        _dark: dracula.Foreground,
      },
      "text.secondary": {
        default: notion.Comment,
        _dark: dracula.Comment,
      },
      bg: {
        default: notion.BackgroundPrimary,
        _dark: dracula.BackgroundPrimary,
      },
      "bg.secondary": {
        default: notion.BackgroundSecondary,
        _dark: dracula.BackgroundSecondary,
      },
      "bg.darker": {
        default: notion.BackgroundDarker,
        _dark: dracula.BackgroundDarker,
      },
    },
  },
  // Cores base do tema
  colors: chakraColors.light
});
