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
    </Head>
  );
}
