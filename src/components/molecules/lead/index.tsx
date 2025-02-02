import { Box, Button, Divider, Flex, Input, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useState } from "react";
import { dracula } from "../../../styles/theme";
import { Span } from "../../atoms/span";
import { Title } from "../../atoms/title";

export function Lead({ location, setIsLoading }) {
  const [email, setEmail] = useState('');
  const [isLoading, _setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = useCallback(async () => {
    _setIsLoading(true);
    setIsLoading(true);

    if (!email) {
      _setIsLoading(false);
      setIsLoading(false);
      return toast({ title: 'Você precisa preencher seu email' })
    }

    try {
      await axios.post('/api/leads', { email, location });
      toast({ title: 'Email cadastrado', status: 'success' })
      _setIsLoading(false);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      _setIsLoading(false);
      setIsLoading(false);

      if (err.request.status === 409) {
        return toast({ title:'Email já cadastrado', status: 'warning' });
      }

      toast({ title:'Falha ao cadastrar email', status: 'error' })
    }
  }, [email, toast, location, setIsLoading]);

  return (
    <Box w="100%">
      <Title>
        🛎️ Adicione seu
        <Span color={dracula.CurrentLine}>
          email
        </Span>
        e recebea desconto e acessso antecipado ao
        <Span color={dracula.CurrentLine}>
          Do Zero ao GP
        </Span>
      </Title>
      <Flex w="100%" pt="8">
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
            {isLoading ? 'Enviando...' : 'Confirmar'}
          </Text>
        </Button>
      </Flex>
    </Box>
  )
}
