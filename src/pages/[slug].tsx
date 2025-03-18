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
import { ThemeToggle } from "../components/molecules/theme-toggle";

export default function Page({ elements }) {
  const items = useMemo(() => {
    return elements.sort((a, b) => a.id - b.id)
  }, [elements]);

  return (
    <>
      <Head />
      <ThemeToggle />
      <Flex direction="column"  w="100vw" align="center" justify="flex-start" minH="100vh">
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
          </Stack>
        </MainContainer>
        <Divider mt="auto"/>
        <Footer/>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;

  const page = await prismaClient.pages.findFirst({
    where: {
      slug,
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
