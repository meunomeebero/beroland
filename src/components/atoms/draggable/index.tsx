import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';


type DraggableProps = {
  children: JSX.Element;
  id: number;
  _style?: Record<string, unknown>;
}

export function Draggable({ children, id, _style }: DraggableProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id});

  const style = {
    transform: CSS.Transform.toString(transform)?.match(/translate3d\(([^)]+)\)/)[0],
    transition,
    width: '100%',
    cursor: 'grabbing',
    ...(_style ? _style : {}),
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  )
}
