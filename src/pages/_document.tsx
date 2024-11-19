import { ColorModeScript } from '@chakra-ui/react';
import Document, { Html, Head, Main, NextScript } from 'next/document';


export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/static/favicon.png" sizes='96x96' type="image/png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
          <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap" rel="stylesheet" />

          <script defer data-website-id="673bef4c885134a19fed6193" data-domain="bero.land" src="https://datafa.st/js/script.js"></script>
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
