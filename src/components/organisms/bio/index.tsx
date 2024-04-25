import { Avatar, Flex, FlexProps, HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type BioProps = FlexProps & { showLinks?: boolean };

const linkStyle = { borderBottom: '2px #fff dashed', color: '#fff' };

export function Bio({ showLinks, ...data}: BioProps) {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <Flex
      w="100vw"
      align="center"
      justify="center"
      direction="column"
      {...data}
      bgRepeat="repeat"
      bgPosition={`center ${offsetY * 0.5}px`}
      bgAttachment="fixed"
    >
      <Flex position="relative">
        <Avatar
          size="xl"
          name={"Roberto Junior"}
          src={"/static/bero.png"}
          bg="#000"
          border="2px solid #6272a4"
        />
      </Flex>
    </Flex>
  );
}
