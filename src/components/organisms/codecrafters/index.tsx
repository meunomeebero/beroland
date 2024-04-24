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

export function CodeCrafters({
  data: { link, title }
}) {
  return (
    <a href={link} style={{ width: '100%' }}>
      <ElementContainer
        size="sm"
        stackProps={{ padding: '2rem 1rem', margin: '0', ml: '0' }}
        marginLeft='auto'
        marginRight='auto'
        {...flexStyled}
      >
        <Flex w="100%" align="center" justify="center">
          <Image width="100px" height="100px" src="https://app.codecrafters.io/assets/7408d202b2bb110054fc.svg" alt="bero"/>
          <Icon as={FaPlus} color="green.400" mx="4"/>
          <Avatar src="/static/bero-fofo.png" w="100px" h="100px" bg="#000"/>
        </Flex>
        <Flex w="100%" align="center" justify="center">
          <Flex direction="column" align="center" justify="center">
            <Text color="gray.500" fontSize="lg" fontWeight="bold">{title}</Text>
          </Flex>
        </Flex>
      </ElementContainer>
    </a>
  );
}
