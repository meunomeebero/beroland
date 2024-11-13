import { Stack, Input, Button, Text } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, FormEvent } from "react";
import reactTextareaAutosize from "react-textarea-autosize";
import { CreateElementParams } from "../../../pages/api/elements";
import { formatElements } from "../../../utils/formatElements";

export function CreateText({ items, setItems, title, component }) {
  const handleCreateElement = useCallback(async (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();

    const eventData = formEvent.target as any;

    const data = {
      text: eventData.text.value,
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
      <Stack spacing="4" alignItems="center" mb="6" w={598}>
        <Input
          as={reactTextareaAutosize}
          variant="unstyled"
          w="100%"
          type="text"
          name="text"
          id="text"
          autoComplete="true"
          borderRadius="0"
          bg="gray.800"
          placeholder="Texto"
          py="2"
          px="4"
        />
        <Button variant="solid" w="100%" borderRadius="0" type="submit">
          <Text color="gray.600" fontWeight="bold">
            Confirmar
          </Text>
        </Button>
      </Stack>
    </form>
  );
}
