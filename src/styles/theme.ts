import { extendTheme } from '@chakra-ui/react';

export const dracula = {
  BackgroundDarker: '#181818',
  BackgroundPrimary: '#1d1e26',
  BackgroundSecondary:	'#282a36',
  CurrentLine: '#44475a',
  Comment:	'#6272a4',
  Foreground:	'#f8f8f2',
  Cyan:	'#8be9fd',
  Green:	'#50fa7b',
  Orange:	'#ffb86c',
  Pink:	'#ff79c6',
  Purple:	'#bd93f9',
  Red:	'#ff5555',
  Yellow:	'#f1fa8c',
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

export const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
  styles: {
    global: {
      body: {
        bg: dracula.BackgroundPrimary,
        color: dracula.Foreground,
      }
    }
  },
  fonts: {
    body: 'Nunito',
    heading: 'Nunito',
  },
  colors: {
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
});
