import { Flex, Text, Icon, Avatar } from "@chakra-ui/react";
import { ElementContainer } from "../../atoms/element-container";
import { dracula } from "../../../styles/theme";
import { FaPlus } from "react-icons/fa";
import { Link } from "../../atoms/link";

const flexStyled = {
  transition: "0.2s",
  border: `2px solid ${dracula.Purple}`,
  _hover: {
    border: `2px solid ${dracula.Pink}`,
  }
}

export function MyOffice() {
  return (
    <Link href="https://blog.bero.land/post/meu-setup" aProps={{ width: "100%" }} target="__blank">
      <ElementContainer
        size="sm"
        stackProps={{ padding: '2rem 1rem', margin: '0', ml: '0' }}
        marginLeft='auto'
        marginRight='auto'
        {...flexStyled}
      >
        <Flex w="100%" align="center" justify="center">
          <Avatar src="/static/setup.png" w="100px" h="100px" bg="#000"/>
          <Icon as={FaPlus} color="green.400" mx="4"/>
          <Avatar src="/static/bero-fofo.png" w="100px" h="100px" bg="#000"/>
        </Flex>
        <Flex w="100%" align="center" justify="center">
          <Flex direction="column" align="center" justify="center">
            <Text  color="gray.500" fontSize="lg" fontWeight="bold">🔥 Meu Setup completo</Text>
          </Flex>
        </Flex>
      </ElementContainer>
    </Link>
  );
}
