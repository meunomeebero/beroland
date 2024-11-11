import { Draggable } from "../../atoms/draggable";
import { Box, Text as CText} from "@chakra-ui/react"

export function Text({
  isDraggable,
  data: { id, title }
}) {
  const NormalComponent = (
    <Box w="100%" mr="auto">
      <CText color="gray.50" fontWeight="medium" fontSize="xl" w="80%">
        {title}
      </CText>
    </Box>
  );

  return !isDraggable ? NormalComponent : (
    <Draggable id={id}>
      {NormalComponent}
    </Draggable>
  );
}
