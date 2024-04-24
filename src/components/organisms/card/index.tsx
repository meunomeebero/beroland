import { Box, Flex, Text, Divider, Image } from "@chakra-ui/react";
import { ElementContainer } from "../../atoms/element-container";

const flexStyled = (color: string) => ({
  border: "2px solid transparent",
  transition: "0.2s",
  _hover: {
    transform: 'scale(1.01)',
    border: `2px solid ${color}`,
  }
})

export function Card({
  data: { image, name, color, title },
  ...props
}) {
  return (
    <ElementContainer
      size="sm"
      {...flexStyled(color)}
      {...props}
      m="0"
      pr="4"
      isAnimationOff
      stackProps={{ padding: '0', margin: '0', ml: '0' }}
    >
      <Flex direction="column" w="174px" align="center" justify="center">
        <Text color="gray.50" mb="2" opacity={0.5}>{title}</Text>
        <Box borderRadius="6" overflow="hidden" bg="#fff" h="190px" w="174px">
          <Image
            boxSize='100%'
            objectFit="cover"
            src={image}
            alt={name}
            mb="2"
          />
        </Box>
        <Divider orientation="horizontal" w="100%" mt="4" mb="4" />
        <Box>
          <Text color="gray.400" fontSize="md">{name}</Text>
        </Box>
      </Flex>
    </ElementContainer>
  );
}
