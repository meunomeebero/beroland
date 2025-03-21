import { Avatar, Flex, FlexProps } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type BioProps = FlexProps & { showLinks?: boolean };

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
      <Flex position="relative" w="200px">
        <Avatar
          size="full"
          name={"Roberto Junior"}
          src={"/static/bero.png"}
          bg="#000"
          border="6px solid #F5F5F5"
        />
      </Flex>
    </Flex>
  );
}
