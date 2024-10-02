import { Affiliate } from "../organisms/affiliate";
import { Banner } from "../organisms/banner";
import { CreateAffiliate } from "../organisms/create-affiliate";
import { CreateIframe } from "../organisms/create-iframe";
import { CreateSection } from "../organisms/create-section";
import { CreateSocial } from "../organisms/create-social";
import { Section } from "../organisms/section";
import { YoutubeIframe } from "../organisms/youtube-iframe";
import { ContentType } from "./content";

export function CreateContent(props) {
  switch (props.type) {
    case ContentType.Social:
      return <CreateSocial {...props}/>
    case ContentType.Iframe:
      return <CreateIframe {...props}/>
    case ContentType.Affiliate:
      return <CreateAffiliate {...props}/>
    case ContentType.Section:
      return <CreateSection {...props}/>
    case ContentType.BANNER:
      return <Banner {...props}/>
    default:
      return <></>;
  }
}
