import { Draggable } from "../../atoms/draggable";
import { Title } from "../../atoms/title";

export function Section({
  isDraggable,
  data: { id, title }
}) {
  const NormalComponent = (
    <Title>
      {title}
    </Title>
  );

  return !isDraggable ? NormalComponent : (
    <Draggable id={id}>
      {NormalComponent}
    </Draggable>
  );
}
