import Confetti from 'react-confetti-boom';
import { Divider, Flex, Stack } from "@chakra-ui/react";
import { MainContainer } from "../components/atoms/main-container";
import { FeedHead as Head } from "../components/atoms/feed-head";
import { Bio } from "../components/organisms/bio";
import { useMemo } from "react";
import { Content } from "../components/templates/content";
import { Lead } from "../components/molecules/lead";
import { prismaClient } from "./api/_prisma";
import { formatJSON } from "../utils/format-json";
import { GetServerSideProps } from "next";
import { Location } from "@prisma/client";
import { Footer } from "../components/organisms/footer";

export default function Home({ elements }) {
  const items = useMemo(() => {
    return elements.sort((a, b) => a.id - b.id)
  }, [elements]);

  return (
    <>
      <Head />
      <Flex direction="column"  w="100vw" align="center" justify="center">
        <Bio pt="8" pb="0" />
        <Confetti mode="fall" colors={["#FFFFFF"]}/>
        <MainContainer align="center" justify="center">
          <Stack spacing="4" flex="1" minW="320px" alignItems="center" mb="6" maxW={598}>
              {items.map(si => (
                <Content
                  type={si.type}
                  key={si.id}
                  data={si}
                  {...si}
                />
              ))}
            <Lead location={Location.BR}/>
          </Stack>
        </MainContainer>
        <Divider/>
        <Footer/>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const page = await prismaClient.pages.findFirst({
    where: {
      slug: 'home',
    },
    include: {
      elements: true,
    }
  });

  const formatted = page?.elements.map(({ order, type, data }) => ({
    id: order,
    type,
    ...formatJSON(data),
  }));

  return {
    props: {
      elements: formatJSON(formatted ?? []),
    }
  }
}
