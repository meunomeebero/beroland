import { Box, Flex, Text, Avatar, Divider, Icon, Image, Button, IconButton, FlexProps, useToast } from "@chakra-ui/react";
import { ElementContainer } from "../../atoms/element-container";
import { dracula } from "../../../styles/theme";
import { BsTicketPerforatedFill } from 'react-icons/bs';
import { Alert } from "../../molecules/alert";
import { UserCredits } from "../../../pages/_api/v1/users/credits";
import { Raffle as IRaffle } from "@prisma/client";
import { useCallback } from "react";
import axios from "axios";
import useSessionStorage from "../../../states/hooks/use-session-storage";
import { PurchaseType } from "../../../pages/_api/_dtos";

const flexStyled = {
  border: "2px solid transparent",
  maxWidth: "260px",
  transition: "0.2s",
  _hover: {
    transform: 'scale(1.01)',
    border: `2px solid ${dracula.Purple}`,
  }
}

type RaffleProps = {
  onConfirm: () => void,
  data: {
    userCredits: UserCredits
  } & Partial<IRaffle & { _count: { tickets: number } }>;
} & FlexProps;

export function Raffle({
  onConfirm,
  data: { image, name, price, userCredits, id, _count },
  ...props
}: RaffleProps) {
  const toast = useToast();
  const token = useSessionStorage('token');

  const purchaseItem = useCallback(async () => {
    try {
      await axios.post('/api/v1/products/purchases', { token, raffleId: id, type: PurchaseType.TICKET });
      onConfirm();
      toast({ title: 'Ticket comprado com sucesso!', status: 'success' });
      toast({ title: '🎉🎉🎉', status: 'success' });
    } catch (err) {
      toast({ title: 'Erro ao solicitar Ticket', status: 'error' });
    }
  }, [id, token, useToast, onConfirm]);

  return (
    <ElementContainer
      size="sm"
      stackProps={{ padding: '0', margin: '0', ml: '0' }}
      {...flexStyled}
      {...props}
      m="2"
    >
      <Flex h="100%" direction="column" w="100%">
        <Box borderRadius="6" w="100%" h="260px" overflow="hidden" bg="#fff">
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

          <Flex align="center">

            <Flex align="center">
              <Text display="flex" mr="1" fontSize="sm" color="green.400">
                {price}
              </Text>
              <Text color="gray.50" opacity={0.5}>gem 💎</Text>
            </Flex>

            <Flex align="center" ml="4">
              <Text color="gray.50" opacity={0.5}>tipo:</Text>
              <Text display="flex" ml="1" fontSize="sm" color="green.400">
                sorteio
              </Text>
            </Flex>
          </Flex>
          <Flex align="center" >
            <Text color="gray.50" opacity={0.5}>Tickets emitidos:</Text>
            <Text display="flex" ml="1" fontSize="sm" color="green.400">
              { _count?.tickets || 0} 🎫
            </Text>
          </Flex>
          <Flex align="center" >
            <Text color="gray.50" opacity={0.5}>Meta:</Text>
            <Text display="flex" ml="1" fontSize="sm" color="green.400">
              10k de inscritos 🎯
            </Text>
          </Flex>
          <Alert handler={purchaseItem} title="🎟️ Confirmar compra de ticket?" text="Após confirmado, um número aleatório será escolhido no seu nome para ser sorteado quando o prazo do sorteio acabar.">
            <Button mt="2" w="100%" isDisabled={userCredits.gem  < price}>
              <Icon as={BsTicketPerforatedFill} />
            </Button>
          </Alert>
        </Box>
      </Flex>
    </ElementContainer>
  );
}
