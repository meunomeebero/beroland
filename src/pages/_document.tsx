import { ColorModeScript } from '@chakra-ui/react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script defer data-domain="bero.land" src="https://plausible.io/js/script.js"></script>
          <link rel="shortcut icon" href="/static/favicon.png" sizes='96x96' type="image/png" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous'/>
          <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet"></link>
        </Head>
        <body style={{ overflowX: 'hidden' }}>
          <ColorModeScript initialColorMode="dark" />
          <Main/>
          <NextScript/>
        </body>
      </Html>
    );
  }
}
