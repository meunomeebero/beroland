import { Draggable } from "../../atoms/draggable";
import { Box, Text as CText} from "@chakra-ui/react"

export function Text({
  isDraggable,
  data: { id, text, title }
}) {
  const NormalComponent = (
    <Box w="100%" mr="auto">
      <CText color="gray.50" fontWeight="medium" fontSize="xl">
        {text ?? title}
      </CText>
    </Box>
  );

  return !isDraggable ? NormalComponent : (
    <Draggable id={id}>
      {NormalComponent}
    </Draggable>
  );
}
