import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { ElementContainer } from "../../atoms/element-container";
import { SocialIcon, SocialProps } from "./social";
import { dracula } from "../../../styles/theme";
import { useCallback, useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import { FaYoutube} from 'react-icons/fa';
import { BsDiscord, BsTiktok } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";

const flexStyled = {
  border: "2px solid transparent",
  transition: "0.2s",
  _hover: {
    transform: 'scale(1.01)',
    border: `2px solid ${dracula.Purple}`,
  }
}

const aStyle = {
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
}

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
}



export function Social({
  containerProps,
  icon,
  isDraggable,
  data: { content, link, title, fallbackLink, id }
}: SocialProps) {
  const onClick = useCallback(() => {
    window.location.href = link;
    setTimeout(function() {
      console.log('redirecting to fallback link');
      window.location.href = fallbackLink;
    }, 3000);
  }, [fallbackLink, link]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id});

  console.log({ transform: CSS.Transform.toString(transform)?.match(/translate3d\(([^)]+)\)/)[0] })

  const style = {
    transform: CSS.Transform.toString(transform)?.match(/translate3d\(([^)]+)\)/)[0],
    transition,
    width: '100%',
    maxWidth: '656px',
    minWidth: '320px',
    cursor: 'grabbing',
    height: '96px'
  };

  const iconMap = new Map([
    [SocialIcon.YouTube, FaYoutube],
    [SocialIcon.Discord, BsDiscord],
    [SocialIcon.Instagram, AiFillInstagram],
    [SocialIcon.TikTok, BsTiktok],
  ])

  const DraggableComponent = (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ElementContainer
        size="sm"
        stackProps={{ padding: '0 1rem', margin: '0', ml: '0' }}
        {...containerProps}
        {...flexStyled}
      >
        <Flex h="100%">
          <div
            style={divStyle}
            onClick={onClick}
          >
            <Box>
              <Text color="gray.600" fontSize="sm">{title}</Text>
              <Text fontSize="sm" mt="1" opacity={0.7}>{content}</Text>
            </Box>
            <Icon as={iconMap.get(icon)} w="6" h="6" color="pink.400"/>
          </div>
        </Flex>
      </ElementContainer>
    </div>
  );

  const NormalComponent = (
    <ElementContainer
      size="sm"
      stackProps={{ padding: '0 1rem', margin: '0', ml: '0' }}
      {...containerProps}
      {...flexStyled}
    >
      <Flex h="100%">
        <a
          style={aStyle}
          onClick={onClick}
          href={link}
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

  return isDraggable ? DraggableComponent : NormalComponent;
}
