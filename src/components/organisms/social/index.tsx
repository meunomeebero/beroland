import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { ElementContainer } from "../../atoms/element-container";
import { SocialProps } from "./social";
import { dracula } from "../../../styles/theme";
import { useCallback } from "react";
import Lottie from 'lottie-react';
import animationData from '../../../../public/static/dance.json'

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

export function Social({
  containerProps,
  icon,
  data: { content, link, title, fallbackLink }
}: SocialProps) {
  const onClick = useCallback(() => {
    window.location.href = link;
    setTimeout(function() {
      console.log('redirecting to fallback link');
      window.location.href = fallbackLink;
    }, 3000);
  }, [fallbackLink, link]);


  return (
    <ElementContainer
      size="sm"
      stackProps={{ padding: '0 1rem', margin: '0', ml: '0' }}
      {...containerProps}
      {...flexStyled}
    >
      <Flex h="100%">
        <a
          href={link}
          style={aStyle}
          onClick={onClick}
        >
          <Box>
            <Text color="gray.600" fontSize="sm">{title}</Text>
            <Text fontSize="sm" mt="1" opacity={0.7}>{content}</Text>
          </Box>
          <Flex w="50px" h="50px" ml="auto">
            <Lottie animationData={animationData}/>
          </Flex>
          <Icon as={icon} w="6" h="6" color="pink.400"/>
        </a>
      </Flex>
    </ElementContainer>
  );
}
