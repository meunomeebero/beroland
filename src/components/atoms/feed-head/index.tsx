import Head from "next/head";
import { appConfig } from "../../../configs/app-config";
import { metaConfig } from "../../../configs/meta-config";

export function FeedHead() {
  return (
    <Head>
      <title>Bero Land</title>
      <meta name="title" content={metaConfig.feed.title}/>
      <meta name="description" content={metaConfig.feed.content} />

      <meta property="og:type" content="website"/>
      <meta property="og:url" content={`${appConfig.baseURL}`}/>
      <meta property="og:title" content={metaConfig.feed.title}/>
      <meta property="og:description" content={metaConfig.feed.content}/>
      <meta property="og:image" content={metaConfig.feed.image}/>

      <meta property="twitter:card" content="summary_large_image"/>
      <meta property="twitter:url" content={`${appConfig.baseURL}`}/>
      <meta property="twitter:title" content={metaConfig.feed.title}/>
      <meta property="twitter:description" content={metaConfig.feed.content}/>
      <meta property="twitter:image" content={metaConfig.feed.image}/>


      {/* Meta Pixel Code */}
      <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '948874153956803');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=948874153956803&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Meta Pixel Code */}
    </Head>
  );
}
