import Confetti from 'react-confetti-boom';
import { Flex } from "@chakra-ui/react";
import { MainContainer } from "../components/atoms/main-container";
import { FeedHead as Head } from "../components/atoms/feed-head";
import { Bio } from "../components/organisms/bio";
import { Lead } from "../components/molecules/lead";
import { Location } from "@prisma/client";
import { useState } from "react";

export default function LeadPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Head />
      <Flex direction="column"  w="100vw" align="center" justify="center" h="100vh">
        <Bio pt="8" pb="0" />
        <Confetti mode="fall" colors={["#FFFFFF"]}/>
        <MainContainer align="center" justify="center">
        <Flex minW="320px" mb="6" maxW={598} align="center" justify="center">
          <Lead location={Location.BR} setIsLoading={setIsLoading}/>
        </Flex>
        </MainContainer>
      </Flex>
    </>
  );
}
