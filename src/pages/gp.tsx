import Confetti from 'react-confetti-boom';
import { Flex, keyframes, Box } from "@chakra-ui/react";
import { MainContainer } from "../components/atoms/main-container";
import { FeedHead as Head } from "../components/atoms/feed-head";
import { Bio } from "../components/organisms/bio";
import { Lead } from "../components/molecules/lead";
import { Location } from "@prisma/client";
import Image from 'next/image';
import { motion } from "framer-motion";
import { useState } from "react";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

export default function LeadPage() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Head />
      <Flex direction="column" w="100vw" align="center" justify="center" h="100vh">
        <Box
          as={motion.div}
          animation={isLoading ? "shake 0.5s ease-in-out infinite" : "float 3s ease-in-out infinite"}
          sx={{
            "@keyframes float": {
              "0%": { transform: "translateY(0px)" },
              "50%": { transform: "translateY(-20px)" },
              "100%": { transform: "translateY(0px)" },
            },
            "@keyframes shake": {
              "0%": { transform: "rotate(0deg)" },
              "25%": { transform: "rotate(-5deg)" },
              "75%": { transform: "rotate(5deg)" },
              "100%": { transform: "rotate(0deg)" },
            },
            "&:hover": {
              animation: "shake 0.5s ease-in-out infinite",
            }
          }}
        >
          <Image
            src="/static/bero-pc.png"
            alt="bero"
            width={371}
            height={240}
          />
        </Box>
        <Confetti mode="fall" colors={["#FFFFFF"]}/>
        <MainContainer align="center" justify="center">
        <Flex minW="320px" mb="6" maxW={598} align="center" justify="center">
          <Lead location={Location.BR} setIsLoading={setIsLoading} />
        </Flex>
        </MainContainer>
      </Flex>
    </>
  );
}
