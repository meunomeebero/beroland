import { Affiliate } from "../organisms/affiliate";
import { Social } from "../organisms/social"
import { YoutubeIframe } from "../organisms/youtube-iframe";

export enum ContentType {
  Social = 'SOCIAL',
  Iframe = 'IFRAME',
  Affiliate = 'AFFILIATE',
}

export function Content(props) {
  switch (props.type) {
    case ContentType.Social:
      return <Social {...props}/>
    case ContentType.Iframe:
      return <YoutubeIframe {...props}/>
    case ContentType.Affiliate:
      return <Affiliate {...props}/>
    default:
      return;
  }
}
