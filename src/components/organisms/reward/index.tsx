import { Box, Flex, Text, Avatar, Divider, Icon, Image, Button, IconButton, FlexProps, useToast, VStack } from "@chakra-ui/react";
import { ElementContainer } from "../../atoms/element-container";
import { dracula } from "../../../styles/theme";
import { BsCashCoin } from 'react-icons/bs';
import { useCallback, useMemo } from "react";
import { Rewards, Users } from "@prisma/client";
import { Alert } from "../../molecules/alert";
import { UserCredits } from "../../../pages/_api/v1/users/credits";
import useSessionStorage from "../../../states/hooks/use-session-storage";
import axios from "axios";
import { PurchaseType } from "../../../pages/_api/_dtos";
import { Link } from "../../atoms/link";

const flexStyled = {
  border: "2px solid transparent",
  maxWidth: "260px",
  transition: "0.2s",
  _hover: {
    transform: 'scale(1.01)',
    border: `2px solid ${dracula.Purple}`,
  }
}

type RewardProps = {
  onConfirm: () => void;
  data: {
    type: 'points' | 'gems';
    userCredits: UserCredits;
  } & Partial<Rewards & { sponsor: Users }>;
} & FlexProps;

export function Reward({
  onConfirm,
  data: { image, price, name, type, stock, userCredits, id, sponsor },
  ...props
}: RewardProps) {
  const toast = useToast();
  const token = useSessionStorage('token');
  const icon = useMemo(() => {
    const icons = {
      'gem': '💎',
      'points': '🎯',
    };

    return icons[type] || null;
  }, []);

  const purchaseItem = useCallback(async () => {
    try {
      await axios.post('/api/v1/products/purchases', { token, rewardId: id, type: PurchaseType.REWARD });
      onConfirm();
      toast({ title: 'Resgate solicitado com sucesso!', status: 'success' });
      toast({ title: '🎉🎉🎉', status: 'success' });
    } catch (err) {
      toast({ title: 'Erro ao solicitar resgate', status: 'error' });
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
              <Text display="flex" fontSize="sm" color="green.400">
                {price}
              </Text>
              <Text color="gray.50" opacity={0.5} ml="1">{type} {icon}</Text>
            </Flex>
            <Flex align="center">
              <Text color="gray.50" opacity={0.5} ml="2">disponível:</Text>
              <Text display="flex" fontSize="sm" ml="1" color="green.400">
                {stock}
              </Text>
            </Flex>
          </Flex>
            <Text color="gray.50" mb="2" opacity={0.5}>----------Patrocinador----------</Text>
            {sponsor && (
              <Link href={`/users/${sponsor.id}`}>
                <Flex>
                  <Avatar src={sponsor.image} size="xs" mr="2"/>
                  <Text color="gray.50" opacity={0.5} noOfLines={1} >{sponsor.name} 🔥</Text>
                </Flex>
              </Link>
            )}
          <Alert handler={purchaseItem} title="📦 Confirmar solicitação de resgate?" text="Após confirmado, você será contactado pelo email para receber o produto.">
            <Button mt="2" w="100%" isDisabled={userCredits[type] < price || stock <= 0}>
              <Icon as={BsCashCoin} />
            </Button>
          </Alert>
        </Box>
      </Flex>
    </ElementContainer>
  );
}
