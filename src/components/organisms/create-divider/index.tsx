import { Stack, Button, Text } from "@chakra-ui/react";
import { ContentType } from "@prisma/client";
import axios from "axios";
import { useCallback, FormEvent } from "react";
import { CreateElementParams } from "../../../pages/api/elements";
import { formatElements } from "../../../utils/formatElements";

export function CreateDivider({ items, setItems, title }) {
  const handleCreateElement = useCallback(async (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();

    const createElementParams: CreateElementParams = {
      type: ContentType.DIVIDER,
      data: {},
      order: items.length,
      pageSlug: title
    }

    try {
      const { data } = await axios.post('/api/elements', createElementParams);
      setItems(items => [...formatElements([data]), ...items]);
    } catch (err) {
      alert(err)
    }
  }, [items, title, setItems]);

  return (
    <form action="submit" onSubmit={handleCreateElement}>
      <Stack spacing="4" alignItems="center" mb="6" w={578}>
        <Button variant="solid" w="100%" borderRadius="md" type="submit">
          <Text color="gray.600" fontWeight="bold">
            Confirmar
          </Text>
        </Button>
      </Stack>
    </form>
  );
}
