import { ITodo, TTypedColumn } from '@/typings';
import { DraggableProvided } from '@hello-pangea/dnd';

type Props = {
  todo: ITodo;
  index: number;
  id: TTypedColumn;
  innerRef: DraggableProvided['innerRef'];
  draggableProps: DraggableProvided['draggableProps'];
  dragHandleProps: DraggableProvided['dragHandleProps'];
};

export const TodoCard = ({ todo, index, id, innerRef, draggableProps, dragHandleProps }: Props) => {
  return <></>;
};
