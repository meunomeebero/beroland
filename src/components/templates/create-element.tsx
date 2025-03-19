import { Banner } from "../organisms/banner";
import { CreateAffiliate } from "../organisms/create-affiliate";
import { CreateDivider } from "../organisms/create-divider";
import { CreateIframe } from "../organisms/create-iframe";
import { CreateSection } from "../organisms/create-section";
import { CreateSocial } from "../organisms/create-social";
import { CreateText } from "../organisms/create-text";
import { CreateMarkdown } from "../organisms/create-markdown";
import { CreateButton } from "../organisms/create-button";
import { ContentType } from "./content";

export function CreateElement(props) {
  switch (props.type) {
    case ContentType.Social:
      return <CreateSocial {...props}/>
    case ContentType.Iframe:
      return <CreateIframe {...props}/>
    case ContentType.Title:
      return <CreateSection {...props}/>
    case ContentType.Text:
      return <CreateText {...props}/>
    case ContentType.Divider:
      return <CreateDivider {...props}/>
    case ContentType.Markdown:
      return <CreateMarkdown {...props}/>
    case ContentType.Button:
      return <CreateButton {...props}/>
    default:
      return <></>;
  }
}
