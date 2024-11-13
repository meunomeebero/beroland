import { Stack, Input, Select, Button, Text } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, FormEvent } from "react";
import { CreateElementParams } from "../../../pages/api/elements";
import { formatElements } from "../../../utils/formatElements";
import { SocialIcon } from "../social/social";

export function CreateSocial({ items, setItems, title, component }) {
  const handleCreateElement = useCallback(async (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();

    const eventData = formEvent.target as any;

    const data = {
      title: eventData.title.value,
      link: eventData.link.value,
      content: eventData.content.value,
      icon: eventData.icon.value,
      component,
    };

    const createElementParams: CreateElementParams = {
      type: data.component,
      data,
      order: items.length,
      pageSlug: title
    }

    try {
      const { data } = await axios.post('/api/elements', createElementParams);

      setItems(items => [...formatElements([data]), ...items]);
    } catch (err) {
      alert(err)
    }

  }, [items, title, setItems, component]);

  return (
    <form action="submit" onSubmit={handleCreateElement}>
      <Stack spacing="4" alignItems="center" mb="4" w={578}>
        <Input
          variant="unstyled"
          w="100%"
          type="text"
          name="title"
          id="title"
          autoComplete="true"
          borderRadius="0"
          bg="gray.800"
          placeholder="Título"
          py="2"
          px="2"
        />
        <Input
          variant="unstyled"
          w="100%"
          type="url"
          name="link"
          id="link"
          autoComplete="true"
          borderRadius="0"
          bg="gray.800"
          placeholder="Link"
          py="2"
          px="2"
        />
        <Input
          variant="unstyled"
          w="100%"
          type="text"
          name="content"
          id="content"
          autoComplete="true"
          borderRadius="0"
          bg="gray.800"
          placeholder="Conteúdo"
          py="2"
          px="2"
        />
        <Select id="icon" variant='flushed' placeholder='Icone' padding={1}>
          {Object.keys(SocialIcon).map((key) => (
            <option key={key} value={key}>{key}</option>
          ))}
        </Select>
        <Button variant="solid" w="100%" borderRadius="md" type="submit">
          <Text color="gray.600" fontWeight="bold">
            Confirmar
          </Text>
        </Button>
      </Stack>
    </form>
  )
}
