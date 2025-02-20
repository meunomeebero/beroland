import { Box, Flex, Text, Icon, Radio } from "@chakra-ui/react";
import { ElementContainer } from "../../atoms/element-container";
import { SocialIcon, SocialProps } from "./social";
import { dracula } from "../../../styles/theme";
import { useCallback } from "react";
import { FaYoutube, FaStar, FaTwitter } from 'react-icons/fa';
import { BsDiscord, BsTiktok } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { Draggable } from "../../atoms/draggable";
import { IoTicket } from "react-icons/io5";

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
  isEditing,
  isDraggable,
  containerProps,
  data: { content, link, title, fallbackLink, id }
}: SocialProps) {
  const iconMap = new Map([
    [SocialIcon.YouTube, FaYoutube],
    [SocialIcon.Discord, BsDiscord],
    [SocialIcon.Instagram, AiFillInstagram],
    [SocialIcon.TikTok, BsTiktok],
    [SocialIcon.File, FaStar],
    [SocialIcon.Twitter, FaTwitter],
    [SocialIcon.Ticket, IoTicket],
  ])

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    window?.["datafast"]?.(`click_${id}`, { description: `Someone clicked on the link ${link}` });
    window.open(link, '_blank');
  }, [link, id]);

  const NormalComponent = (
    <ElementContainer
      size="sm"
      cursor={!isDraggable && "pointer"}
      // bg="pink.300"
      bg="gray.900"
    >
      <Flex h="100%">
        <a
          style={aStyle}
          href={!isDraggable ? link : undefined}
          onClick={!isDraggable ? handleClick : undefined}
        >
          <Box pr="4">
            <Text color="pink.400" fontWeight="bold" opacity={0.4} fontSize="lg">{title}</Text>
            <Text fontStyle="italic" fontSize="md" mt="1" fontWeight="medium" opacity={0.8}>{content}</Text>
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
