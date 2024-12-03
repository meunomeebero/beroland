import Confetti from 'react-confetti-boom';
import { Divider, Flex, Stack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Input, VStack, Text } from "@chakra-ui/react";
import { MainContainer } from "../components/atoms/main-container";
import { FeedHead as Head } from "../components/atoms/feed-head";
import { Bio } from "../components/organisms/bio";
import { useMemo, useState } from "react";
import { Content } from "../components/templates/content";
import { prismaClient } from "./api/_prisma";
import { formatJSON } from "../utils/format-json";
import { GetServerSideProps } from "next";
import { Footer } from "../components/organisms/footer";

export default function Home({ elements }) {
  const [isOpen, setIsOpen] = useState(false);
  const items = useMemo(() => {
    return elements.sort((a, b) => a.id - b.id)
  }, [elements]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your email submission logic here
    setIsOpen(false);
  };

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
          </Stack>
        </MainContainer>
        <Divider/>
        <Footer/>
      </Flex>

      {/* Floating Button */}
      <Button
        position="fixed"
        bottom="8"
        right="8"
        width="16"
        height="16"
        borderRadius="full"
        bg="white"
        boxShadow="lg"
        onClick={() => setIsOpen(true)}
        animation="bounce 2s infinite"
        _hover={{ transform: "scale(1.1)" }}
      >
        👋🏻
      </Button>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} isCentered>
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)'/>
        <ModalContent mx="4" bg="gray.800">
          <ModalHeader>Fique por dentro dos meus proximos lançamentos 👀</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text fontSize="sm" color="gray.400" mb="6">
              Quer aprender a programar? Quer criar aplicativos? Quer ser um Indie Hacker? Coloque seu e-mail aqui meu chapa! 👇🏻👇🏻👇🏻
            </Text>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <Input
                  placeholder="Seu melhor e-mail"
                  type="email"
                  required
                />
                <Button type="submit" width="full" bg="pink.400" _hover={{ bg: "pink.500" }}>
                  Enviar
                </Button>
              </VStack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
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
