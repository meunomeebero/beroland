import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { useApi } from "../../../hooks/useApi";
import { ContentType } from "../../templates/content";

interface CreateButtonProps {
  pageSlug: string;
  onSuccess?: () => void;
}

export function CreateButton({ pageSlug, onSuccess }: CreateButtonProps) {
  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const { createElement, loading } = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createElement(
      pageSlug,
      ContentType.Button,
      { text, url },
      0,
      onSuccess
    );

    setText("");
    setUrl("");
  };

  return (
    <Box as="form" onSubmit={handleSubmit} width="100%">
      <Stack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Texto do botão</FormLabel>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Texto que será exibido no botão"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>URL</FormLabel>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://exemplo.com"
            type="url"
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          isLoading={loading}
          isDisabled={!text || !url}
        >
          Criar botão
        </Button>
      </Stack>
    </Box>
  );
}
