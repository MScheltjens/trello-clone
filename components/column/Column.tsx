'use client';

import { ITodo, TTypedColumn } from '@/typings';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { PlusCircleIcon } from '@heroicons/react/20/solid';

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
                <h2 className="flex justify-between font-bold text-xl p-2">
                  {idToColumnText[id]}
                  <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal">{todos.length}</span>
                </h2>
                <div className="space-y-2">
                  {todos.map((todo, index) => (
                    <Draggable draggableId={todo.$id} index={index} key={todo.$id}>
                      {(provided) => <TodoCard todo={todo} index={index} id={id} innerRef={provided.innerRef} draggableProps={provided.draggableProps} dragHandleProps={provided.dragHandleProps} />}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
                {provided.placeholder}
                <div className="flex items-end justify-end">
                  <button className="text-green-500 hover:text-green-600">
                    <PlusCircleIcon className="h-6 w-6" />
                  </button>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
