import { ChakraProvider} from "@chakra-ui/react"
import { theme } from "../styles/theme"
import { QueryClient, QueryClientProvider } from "react-query";
import './styles.scss';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
