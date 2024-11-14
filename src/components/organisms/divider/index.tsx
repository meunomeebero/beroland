import { Divider as ChakraDivider, Box } from "@chakra-ui/react";
import { Draggable } from "../../atoms/draggable";

export function Divider({
  isDraggable,
  data: { id }
}) {
  const NormalComponent = (
    <ChakraDivider py="2" />
  );

  return !isDraggable ? NormalComponent : (
    <Draggable id={id}>
      {NormalComponent}
    </Draggable>
  );
}
