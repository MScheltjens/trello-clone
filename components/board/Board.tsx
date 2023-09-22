import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export const Board = () => {
  return (
    <DragDropContext>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => <div>{/*rendering all columns*/}</div>}
      </Droppable>
    </DragDropContext>
  );
};
