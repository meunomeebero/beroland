import { Button, Flex, Icon } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Affiliate } from "../organisms/affiliate";
import { Banner } from "../organisms/banner";
import { Divider } from "../organisms/divider";
import { Section } from "../organisms/section";
import { Social } from "../organisms/social"
import { Text } from "../organisms/text";
import { YoutubeIframe } from "../organisms/youtube-iframe";
import { Markdown } from "../organisms/markdown";

export enum ContentType {
  Social = 'SOCIAL',
  Iframe = 'IFRAME',
  Affiliate = 'AFFILIATE',
  Section = 'SECTION',
  BANNER = "BANNER",
  TEXT = 'TEXT',
  DIVIDER = 'DIVIDER',
  MARKDOWN = 'MARKDOWN',
}

export function Content(props) {
  const deleteElement = useCallback(async () => {
    await axios.delete(`/api/elements?id=${props.dbId}`);
    props.reload();
  }, [props]);

  function getComponent() {
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
      case ContentType.DIVIDER:
        return <Divider {...props}/>
      case ContentType.MARKDOWN:
        return <Markdown {...props}/>
      default:
        return;
    }
  }

  return !props.isDeleting ? getComponent() : (
    <Flex w="100%" position="relative" align="center" justify="center">
      <Button position="absolute" my="auto" left="-14" onClick={() => deleteElement()} variant="ghost">
        <Icon as={FaTrash} color="purple.400"/>
      </Button>
      {getComponent()}
    </Flex>
  );
}
