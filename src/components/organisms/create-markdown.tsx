import { Stack, Button, Text, Textarea } from "@chakra-ui/react";
import { ContentType } from "@prisma/client";
import axios from "axios";
import { useCallback, FormEvent } from "react";
import { CreateElementParams } from "../../pages/api/elements";
import { formatElements } from "../../utils/formatElements";

interface CreateMarkdownProps {
  items: any[];
  setItems: any;
  title: string;
  component: string;
}

export function CreateMarkdown({ items, setItems, title, component }: CreateMarkdownProps) {
  const handleCreateElement = useCallback(async (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();

    const eventData = formEvent.target as any;
    const content = eventData.content.value.replace(/\n/g, '  \n'); // Add two spaces before newline for markdown line breaks

    const data = {
      content,
      component,
    };

    const createElementParams: CreateElementParams = {
      type: data.component as ContentType,
      data,
      order: items.length,
      pageSlug: title
    }

    try {
      const { data: responseData } = await axios.post('/api/elements', createElementParams);
      setItems(items => [...formatElements([responseData]), ...items]);
    } catch (err) {
      alert(err)
    }
  }, [items, title, setItems, component]);

  return (
    <form action="submit" onSubmit={handleCreateElement}>
      <Stack spacing="4" alignItems="center" mb="6" w={578}>
        <Textarea
          variant="unstyled"
          w="100%"
          name="content"
          id="content"
          autoComplete="true"
          borderRadius="0"
          bg="gray.800"
          placeholder="Enter markdown content..."
          py="2"
          px="4"
          whiteSpace="pre-wrap"
        />
        <Button variant="solid" w="100%" borderRadius="md" type="submit">
          <Text color="gray.600" fontWeight="bold">
            Confirmar
          </Text>
        </Button>
      </Stack>
    </form>
  );
}
