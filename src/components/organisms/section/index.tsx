import { Box } from "@chakra-ui/react";
import { Draggable } from "../../atoms/draggable";
import { Title } from "../../atoms/title";

export function Section({
  isDraggable,
  data: { id, title }
}) {
  const NormalComponent = (
    <Box w="100%" mr="auto">
      <Title>
        {title}
      </Title>
    </Box>
  );

  return !isDraggable ? NormalComponent : (
    <Draggable id={id}>
      {NormalComponent}
    </Draggable>
  );
}
