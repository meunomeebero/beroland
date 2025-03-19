import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { theme } from "../styles/theme"
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect } from "react";
import './styles.scss';
import '../styles/highlight.css';

const queryClient = new QueryClient();

// Component to synchronize theme with data-theme attribute
function ThemeSync({ children }) {
  useEffect(() => {
    // Function to synchronize color mode with data-theme attribute
    const syncTheme = () => {
      const colorMode = localStorage.getItem("chakra-ui-color-mode") || "light";
      document.documentElement.setAttribute("data-theme", colorMode);
    };

    // Immediate sync on page load
    syncTheme();
    
    // Watch storage events (for theme changes from other tabs)
    window.addEventListener("storage", syncTheme);
    
    // Custom event for theme changes
    window.addEventListener("themechange", syncTheme);
    
    // Cleanup when component unmounts
    return () => {
      window.removeEventListener("storage", syncTheme);
      window.removeEventListener("themechange", syncTheme);
    };
  }, []);

  return <>{children}</>;
}

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <ThemeSync>
          <Component {...pageProps} />
        </ThemeSync>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
