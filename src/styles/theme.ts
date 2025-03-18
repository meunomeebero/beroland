import { extendTheme } from '@chakra-ui/react';

export const notion = {
  BackgroundDarker: '#F5F5F5',
  BackgroundPrimary: '#FFFFFF',
  BackgroundSecondary: '#F7F7F7',
  CurrentLine: '#EAEAEA',
  Comment: '#8F8F8F',
  Foreground: '#37352F',
  Cyan: '#148FD8',
  Green: '#0F7B6C',
  Orange: '#D9730D',
  Pink: '#AD1A72',
  Purple: '#6940A5',
  Red: '#E03E3E',
  Yellow: '#DFAB01',
};

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

const colors = {
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
      300: '#F5EFFF',
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

export const theme = extendTheme({
  initialColorMode: 'light', // Setting light mode as default
  useSystemColorMode: false,
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? dracula.BackgroundPrimary : notion.BackgroundPrimary,
        color: props.colorMode === 'dark' ? dracula.Foreground : notion.Foreground,
      }
    })
  },
  fonts: {
    body: 'Nunito',
    heading: 'Nunito',
  },
  colors: colors.light
});
