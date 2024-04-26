import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { ElementContainer } from "../../atoms/element-container";
import { SocialIcon, SocialProps } from "./social";
import { dracula } from "../../../styles/theme";
import { useCallback } from "react";
import { FaYoutube} from 'react-icons/fa';
import { BsDiscord, BsTiktok } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { Draggable } from "../../atoms/draggable";

const flexStyled = {
  border: "2px solid transparent",
  transition: "0.2s",
  _hover: {
    transform: 'scale(1.01)',
    border: `2px solid ${dracula.Purple}`,
  }
}

const aStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
}

export function Social({
  icon,
  isDraggable,
  containerProps,
  data: { content, link, title, fallbackLink, id }
}: SocialProps) {
  const onClick = useCallback(() => {
    window.location.href = link;
    setTimeout(function() {
      console.log('redirecting to fallback link');
      window.location.href = fallbackLink;
    }, 3000);
  }, [fallbackLink, link]);

  const iconMap = new Map([
    [SocialIcon.YouTube, FaYoutube],
    [SocialIcon.Discord, BsDiscord],
    [SocialIcon.Instagram, AiFillInstagram],
    [SocialIcon.TikTok, BsTiktok],
  ])

  const NormalComponent = (
    <ElementContainer
      size="sm"
      stackProps={{ padding: '0 1rem', margin: '0', ml: '0' }}
      cursor={!isDraggable && "pointer"}
      {...containerProps}
      {...flexStyled}
    >
      <Flex h="100%">
        <a
          style={aStyle}
          onClick={onClick}
          href={!isDraggable && link}
        >
          <Box>
            <Text color="gray.600" fontSize="sm">{title}</Text>
            <Text fontSize="sm" mt="1" opacity={0.7}>{content}</Text>
          </Box>
          <Icon as={iconMap.get(icon)} w="6" h="6" color="pink.400"/>
        </a>
      </Flex>
    </ElementContainer>
  )

  return !isDraggable ? NormalComponent : (
    <Draggable id={id}>
      {NormalComponent}
    </Draggable>
  )
}
