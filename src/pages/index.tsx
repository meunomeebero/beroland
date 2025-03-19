import Confetti from 'react-confetti-boom';
import { Divider, Flex, Stack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Input, VStack, Text, useToast, useColorModeValue } from "@chakra-ui/react";
import { MainContainer } from "../components/atoms/main-container";
import { FeedHead as Head } from "../components/atoms/feed-head";
import { Bio } from "../components/organisms/bio";
import { useCallback, useMemo, useState } from "react";
import { Content } from "../components/templates/content";
import { prismaClient } from "./api/_prisma";
import { formatJSON } from "../utils/format-json";
import { GetServerSideProps } from "next";
import { Footer } from "../components/organisms/footer";
import axios from 'axios';
import { Location } from '@prisma/client';
import { ThemeToggle } from '../components/molecules/theme-toggle';

export default function Home({ elements }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const items = useMemo(() => {
    return elements.sort((a, b) => a.id - b.id)
  }, [elements]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = e.currentTarget?.email?.value;

    if (!email) {
      return toast({ title: 'Você precisa preencher seu email' })
    }

    setIsLoading(true);

    try {
      await axios.post('/api/leads', { email, location: Location.BR });
      toast({ title: 'Email cadastrado', status: 'success' })
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);

      if (err.request.status === 409) {
        return toast({ title:'Email já cadastrado', status: 'warning' });
      }

      toast({ title:'Falha ao cadastrar email', status: 'error' })
    }
  }, [toast]);


  return (
    <>
      <Head />
      <ThemeToggle />
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
        bg={useColorModeValue("pink.300", "white")}
        color={useColorModeValue("gray.800", "gray.800")}
        boxShadow="lg"
        onClick={() => setIsOpen(true)}
        animation="bounce 2s infinite"
        _hover={{ transform: "scale(1.1)" }}
      >
        👋🏻
      </Button>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} isCentered>
        <ModalOverlay
          bg={useColorModeValue('whiteAlpha.300', 'blackAlpha.300')}
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent
          mx="4"
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={useColorModeValue("0 4px 6px rgba(0,0,0,0.05)", "dark-lg")}
          border={useColorModeValue("1px solid", "none")}
          borderColor={useColorModeValue("gray.200", "transparent")}
        >
          <ModalHeader color={useColorModeValue("gray.600", "white")}>Fique por dentro dos meus proximos lançamentos 👀</ModalHeader>
          <ModalCloseButton color={useColorModeValue("gray.600", "gray.400")} />
          <ModalBody pb={6}>
            <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")} mb="6">
              Quer aprender a programar? Quer criar aplicativos? Quer ser um Indie Hacker? Coloque seu e-mail aqui meu chapa! 👇🏻👇🏻👇🏻
            </Text>
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <Input
                  placeholder="Seu melhor e-mail"
                  type="email"
                  name="email"
                  required
                  bg={useColorModeValue("white", "gray.700")}
                  borderColor={useColorModeValue("gray.300", "gray.600")}
                  _hover={{
                    borderColor: useColorModeValue("gray.400", "gray.500")
                  }}
                  _focus={{
                    borderColor: useColorModeValue("pink.300", "pink.400"),
                    boxShadow: useColorModeValue(
                      "0 0 0 1px #AD1A72",
                      "0 0 0 1px #ff79c6"
                    )
                  }}
                />
                <Button
                  type="submit"
                  width="full"
                  bg={useColorModeValue("pink.400", "pink.400")}
                  color={useColorModeValue("white", "white")}
                  _hover={{ bg: useColorModeValue("pink.500", "pink.500") }}
                  isLoading={isLoading}
                >
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
