import { Banner } from "../organisms/banner";
import { CreateAffiliate } from "../organisms/create-affiliate";
import { CreateDivider } from "../organisms/create-divider";
import { CreateIframe } from "../organisms/create-iframe";
import { CreateSection } from "../organisms/create-section";
import { CreateSocial } from "../organisms/create-social";
import { CreateText } from "../organisms/create-text";
import { CreateMarkdown } from "../organisms/create-markdown";
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
    case ContentType.TEXT:
      return <CreateText {...props}/>
    case ContentType.DIVIDER:
      return <CreateDivider {...props}/>
    case ContentType.MARKDOWN:
      return <CreateMarkdown {...props}/>
    default:
      return <></>;
  }
}
