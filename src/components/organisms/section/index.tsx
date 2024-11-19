import { Box } from "@chakra-ui/react";
import { useMemo } from "react";
import { dracula } from "../../../styles/theme";
import { Draggable } from "../../atoms/draggable";
import { Span } from "../../atoms/span";
import { Title } from "../../atoms/title";

export function Section({
  isDraggable,
  data: { id, title }
}) {
  const formattedTitle = useMemo(() => {
    const regex = /\*\*(.*?)\*\*/g;
    const matches = title.matchAll(regex);
    let formatted = title;
    for (const match of matches) {
      const [full, text] = match;
      formatted = formatted.replace(full, `<span style="background: ${dracula.CurrentLine}; margin: 0 0.1rem;">${text}</span>`);
    }
    return <span dangerouslySetInnerHTML={{ __html: formatted }} />;

  }, [title]);


  const NormalComponent = (
    <Box w="100%" mr="auto" my="4">
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
