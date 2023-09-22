'use client';

import { useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export const Board = () => {
  useEffect(() => {
    // getBoard();
  }, []);
  return (
    <></>
    // <DragDropContext>
    //   <Droppable droppableId="board" direction="horizontal" type="column">
    //     {(provided) => <div>{/*rendering all columns*/}</div>}
    //   </Droppable>
    // </DragDropContext>
  );
};
