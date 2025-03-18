import { Box, useColorModeValue } from "@chakra-ui/react";
import { useMemo } from "react";
import { dracula, notion } from "../../../styles/theme";
import { Draggable } from "../../atoms/draggable";
import { Span } from "../../atoms/span";
import { Title } from "../../atoms/title";

export function Section({
  isDraggable,
  data: { id, title }
}) {
  const highlightBackground = useColorModeValue(notion.CurrentLine, dracula.CurrentLine);

  const formattedTitle = useMemo(() => {
    const regex = /\*\*(.*?)\*\*/g;
    const matches = title.matchAll(regex);
    let formatted = title;
    for (const match of matches) {
      const [full, text] = match;
      formatted = formatted.replace(full, `<span style="background: ${highlightBackground}; margin: 0 0.1rem;">${text}</span>`);
    }
    return <span dangerouslySetInnerHTML={{ __html: formatted }} />;

  }, [title, highlightBackground]);


  const NormalComponent = (
    <Box w="100%" mr="auto">
      <Title>
        {formattedTitle}
      </Title>
    </Box>
  );

  return !isDraggable ? NormalComponent : (
    <Draggable id={id}>
      {NormalComponent}
    </Draggable>
  );
}
