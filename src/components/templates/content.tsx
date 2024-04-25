import { Social } from "../organisms/social"
import { SocialProps } from "../organisms/social/social";
import { YoutubeIframe } from "../organisms/youtube-iframe";

export enum ContentType {
  Social = 'SOCIAL',
  Iframe = 'IFRAME',
  Affiliate = 'AFFILIATE',
}

export function Content(props) {
  switch (props.type) {
    case ContentType.Social:
      const socialProps = props as SocialProps;
      return (
        <Social {...socialProps}/>
      );
    case ContentType.Iframe:
      return (
        <YoutubeIframe {...props}/>
      );
    default:
      return;
  }
}
