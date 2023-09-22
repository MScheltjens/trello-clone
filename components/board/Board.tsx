'use client';

import { useBoardStore } from '@/store';
import { useEffect } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { Column } from '../column/Column';

export const Board = () => {
  const [board, getBoard] = useBoardStore((state) => [state.board, state.getBoard]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {};

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto" {...provided.droppableProps} ref={provided.innerRef}>
            {
              // we need to convert the Columns of type Map to an array
              Array.from(board.columns.entries()).map(([id, column], i) => (
                <Column key={id} id={id} todos={column.todos} index={i} />
              ))
            }
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
