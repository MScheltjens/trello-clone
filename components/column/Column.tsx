'use client';

import { ITodo, TTypedColumn } from '@/typings';
import { Draggable, Droppable } from '@hello-pangea/dnd';

type Props = {
  id: TTypedColumn;
  todos: ITodo[];
  index: number;
};

const idToColumnText: {
  [key in TTypedColumn]: string;
} = {
  todo: 'To Do',
  inprogress: 'in Progress',
  done: 'Done',
};

export const Column = ({ id, todos, index }: Props) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapShot) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className={`p-2 rounded-2xl shadow-sm ${snapShot.isDraggingOver ? 'bg-green-200' : 'bg-white/50'}`}>
                <h2>{id}</h2>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
