'use client';

import { useBoardStore } from '@/store';
import { useEffect } from 'react';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { Column } from '../column/Column';

export const Board = () => {
  const [board, getBoard] = useBoardStore((state) => [state.board, state.getBoard]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;
    // check if user dragged card outside of the board
    if (!destination) return;

    // handle column drag
    if (type === 'column') {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
    }
  };

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
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
