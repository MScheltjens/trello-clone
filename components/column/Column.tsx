'use client';

import { ITodo, TTypedColumn } from '@/typings';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { TodoCard } from '../todoCard/TodoCard';
import { useBoardStore, useModalStore } from '@/store';

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
  const [searchString] = useBoardStore((state) => [state.searchString]);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapShot) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className={`p-2 rounded-2xl shadow-sm ${snapShot.isDraggingOver ? 'bg-green-200' : 'bg-white/50'}`}>
                <h2 className="flex justify-between font-bold text-xl p-2">
                  {idToColumnText[id]}
                  <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm font-normal">{!searchString ? todos.length : todos.filter((todo) => todo.title.toLowerCase().includes(searchString.toLowerCase())).length}</span>
                </h2>
                <div className="space-y-2">
                  {todos.map((todo, index) => {
                    if (searchString && !todo.title.toLowerCase().includes(searchString.toLowerCase())) return null;
                    return (
                      <Draggable draggableId={todo.$id} index={index} key={todo.$id}>
                        {(provided) => <TodoCard todo={todo} index={index} id={id} innerRef={provided.innerRef} draggableProps={provided.draggableProps} dragHandleProps={provided.dragHandleProps} />}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
                {provided.placeholder}
                <div className="flex items-end justify-end pt-2">
                  <button className="text-green-500 hover:text-green-600" onClick={openModal}>
                    <PlusCircleIcon className="h-10 w-10" />
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
