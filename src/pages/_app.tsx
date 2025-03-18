import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { theme } from "../styles/theme"
import { QueryClient, QueryClientProvider } from "react-query";
import './styles.scss';
import '../styles/highlight.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
