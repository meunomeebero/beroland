import { Flex, Text, Icon, Avatar } from "@chakra-ui/react";
import { ElementContainer } from "../../atoms/element-container";
import { dracula } from "../../../styles/theme";
import { FaPlus } from "react-icons/fa";
import { Draggable } from "../../atoms/draggable";

const flexStyled = {
  transition: "0.2s",
  border: `2px solid ${dracula.Purple}`,
  _hover: {
    border: `2px solid ${dracula.Pink}`,
  }
}

/**
 * Interface para as props do componente Affiliate
 */
interface AffiliateProps {
  data: any;  // Para compatibilidade com ContentProps
  isDraggable?: boolean;
  type?: string;  // Para compatibilidade com ContentProps
  dbId?: number;  // Para compatibilidade com ContentProps
  reload?: (data?: any) => void;  // Para compatibilidade com ContentProps
  isEditing?: boolean;  // Para compatibilidade com ContentProps
  isDeleting?: boolean;  // Para compatibilidade com ContentProps
}

export function Affiliate({ data, isDraggable = false }: AffiliateProps) {
  // Extrair valores com fallbacks para evitar erros
  const { link = '#', text = '', highlight = '', image = '', id = 0 } = data || {};
  const Component = (
    <a href={!isDraggable && link} style={{ width: '100%' }}>
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
          <Avatar src="https://yt3.googleusercontent.com/re0UGxLR4RaxWtYgipEg6qmMMr_1AaeKFhHYbncqEWwJuAns4NsXWCMAMKX9QysrsHhWiVbEbw=s160-c-k-c0x00ffffff-no-rj" w="100px" h="100px" bg="#000"/>
        </Flex>
        <Flex w="100%" align="center" justify="center">
          <Flex direction="column" align="center" justify="center" w="70%" textAlign="center">
            <Text color="gray.500" fontSize="lg" fontWeight="bold" >
              {text}
              <span
                style={{
                  background: dracula.BackgroundPrimary,
                  padding: '0.2rem',
                  color: dracula.Comment,
                }}
              >
                {highlight}
              </span>
            </Text>
          </Flex>
        </Flex>
      </ElementContainer>
    </a>
  );

  return !isDraggable ? Component : (
    <Draggable id={id}>
      {Component}
    </Draggable>
  );
}
