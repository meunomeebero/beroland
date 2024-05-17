import { Box, Button, Divider, Flex, Input, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useState } from "react";
import { Title } from "../../atoms/title";

export function NewsLetter({ location }) {
  const [email, setEmail] = useState('');

  const toast = useToast();

  const handleSubmit = useCallback(async () => {
    if (!email) {
      return toast({ title: 'Você precisa preencher seu email' })
    }

    try {
      await axios.post('/api/leads', { email, location });
      toast({ title: 'Email cadastrado', status: 'success' })
    } catch (err) {
      if (err.request.status === 409) {
        return toast({ title:'Email já cadastrado', status: 'warning' });
      }

      toast({ title:'Falha ao cadastrar email', status: 'error' })
    }
  }, [email, toast, location]);

  return (
    <Box w="100%">
      <Title>
        🔥 Receba dicas e novidades pelo email 🔥
      </Title>
      <Flex w="100%">
        <Input
          variant="unstyled"
          w="60%"
          type="email"
          name="email"
          id="email"
          autoComplete="true"
          borderRadius="0"
          bg="gray.800"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
          py="2"
          px="4"
        />
        <Button variant="solid" w="40%" borderRadius="0" onClick={handleSubmit}>
          <Text color="gray.600" fontWeight="bold">
            Confirmar
          </Text>
        </Button>
      </Flex>
    </Box>
  )
}
