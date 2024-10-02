import Head from "next/head";
import { metaConfig } from "../../../configs/meta-config";

export function EditHead({ title }) {
  return (
    <Head>
      <title>{title ?? "Bero Land"}</title>
      <meta name="title" content={title ?? metaConfig.feed.title}/>
    </Head>
  );
}
