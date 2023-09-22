'use client';

import { useBoardStore } from '@/store';
import { useEffect } from 'react';

export const Board = () => {
  const getBoard = useBoardStore((state) => state.getBoard);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  return (
    <h1>Hello</h1>
    // <DragDropContext>
    //   <Droppable droppableId="board" direction="horizontal" type="column">
    //     {(provided) => <div>{/*rendering all columns*/}</div>}
    //   </Droppable>
    // </DragDropContext>
  );
};
