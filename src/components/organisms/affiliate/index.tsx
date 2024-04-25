import { Flex, Text, Icon, Avatar } from "@chakra-ui/react";
import { ElementContainer } from "../../atoms/element-container";
import { dracula } from "../../../styles/theme";
import { FaPlus } from "react-icons/fa";
import Image from "next/image";

const flexStyled = {
  transition: "0.2s",
  border: `2px solid ${dracula.Purple}`,
  _hover: {
    border: `2px solid ${dracula.Pink}`,
  }
}

export function Affiliate({
  data: { link, title, highlight, image }
}) {
  return (
    <a href={link} style={{ width: '100%' }}>
      <ElementContainer
        size="sm"
        stackProps={{ padding: '2rem 1rem', margin: '0', ml: '0' }}
        marginLeft='auto'
        marginRight='auto'
        overflow="hidden"
        position="relative"
        {...flexStyled}
      >
        <Flex w="100%" align="center" justify="center">
          <Avatar src={image} w="100px" h="100px" bg="#000"/>
          <Icon as={FaPlus} color="green.400" mx="4"/>
          <Avatar src="/static/bero-fofo.png" w="100px" h="100px" bg="#000"/>
        </Flex>
        <Flex w="100%" align="center" justify="center">
          <Flex direction="column" align="center" justify="center" w="70%" textAlign="center">
            <Text color="gray.500" fontSize="lg" fontWeight="bold" >
              {title} <span style={{
                background: dracula.BackgroundPrimary,
                padding: '0.2rem',
                color: dracula.Comment,
              }}>{highlight}</span>
            </Text>
          </Flex>
        </Flex>
      </ElementContainer>
    </a>
  );
}
