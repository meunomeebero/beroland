import { Affiliate } from "../organisms/affiliate";
import { Banner } from "../organisms/banner";
import { Section } from "../organisms/section";
import { Social } from "../organisms/social"
import { Text } from "../organisms/text";
import { YoutubeIframe } from "../organisms/youtube-iframe";

export enum ContentType {
  Social = 'SOCIAL',
  Iframe = 'IFRAME',
  Affiliate = 'AFFILIATE',
  Section = 'SECTION',
  BANNER = "BANNER",
  TEXT = 'TEXT',
}

export function Content(props) {
  switch (props.type) {
    case ContentType.Social:
      return <Social {...props}/>
    case ContentType.Iframe:
      return <YoutubeIframe {...props}/>
    case ContentType.Affiliate:
      return <Affiliate {...props}/>
    case ContentType.Section:
      return <Section {...props}/>
    case ContentType.BANNER:
      return <Banner {...props}/>
    case ContentType.TEXT:
        return <Text {...props}/>
    default:
      return;
  }
}
