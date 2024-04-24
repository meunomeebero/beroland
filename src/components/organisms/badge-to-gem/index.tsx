import { Button, Divider, Flex, HStack, Icon, Image, Text, useToast } from "@chakra-ui/react";
import { Achievements } from "@prisma/client";
import axios from "axios";
import { useCallback } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import useSessionStorage from "../../../states/hooks/use-session-storage";
import { Alert } from "../../molecules/alert";

type BadgeToGemProps = {
  data: Achievements;
  onConfirm: () => void;
};

export function BadgeToGem({ data, onConfirm }: BadgeToGemProps) {
  const token = useSessionStorage('token', data);
  const toast = useToast();

  const tradeBadge = useCallback(async () => {
    try {
      await axios.post('/api/v1/achievements/to-loots', {
        token,
        achievementId: data.id,
      });

      toast({
        title: 'Troca realizada com sucesso!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      toast({ title: '🎉🎉🎉', status: 'success' });

      onConfirm();
    } catch (err) {
      toast({
        title: 'Ocorreu um erro ao realizar a troca! 😕',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });

      console.error(err);
    }
  }, [toast, token, data, onConfirm]);

  return (
    <HStack m="4" spacing="4" borderRadius="10" bg="gray.700" overflow="hidden">
      <Image
        borderRadius='full'
        boxSize='80px'
        src={data.image}
        alt={data.name}
        m="2"
      />
      <Icon as={BiRightArrowAlt}/>
      <Text color="green.400" w="20">
        {data.value} 💎 <br/> {data.value * 10} 🎯
      </Text>
      <Divider orientation="vertical" h="100%"/>
      <Alert handler={tradeBadge} title="Você tem certeza que deseja trocar seu badge?" text="Após trocar, você continuará com seu badge, entretanto ele aparecerá no seu perfil com uma coloração mais apagada, simbolizando que ja foi usado.">
        <Button bg="green.400" h="110px" width="20%" borderRadius="0">
          ok
        </Button>
      </Alert>
    </HStack>
  );
}
