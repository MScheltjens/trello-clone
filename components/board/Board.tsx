'use client';

import { useBoardStore } from '@/store';
import { useEffect } from 'react';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { Column } from '../column/Column';
import { IColumn } from '@/typings';

export const Board = () => {
  const [board, getBoard, setBoardState, updateTask] = useBoardStore((state) => [state.board, state.getBoard, state.setBoardState, state.updateTask]);

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
      setBoardState({ ...board, columns: rearrangedColumns });
    }

    // this step is needed as the indexes are stored as numbers 0,1,2 etc.. instead of id's with DND library
    const columns = Array.from(board.columns.entries());
    const startColIndex = columns[Number(source.droppableId)];
    const endColIndex = columns[Number(destination.droppableId)];

    const startCol: IColumn = {
      id: startColIndex[0],
      todos: startColIndex[1].todos,
    };

    const endCol: IColumn = {
      id: endColIndex[0],
      todos: endColIndex[1].todos,
    };

    if (!startCol || !endCol) return;

    if (source.index === destination.index && startCol.id === endCol.id) return;

    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);

    if (startCol.id === endCol.id) {
      // same column task drag
      newTodos.splice(destination.index, 0, todoMoved);
      const newCol: IColumn = {
        id: startCol.id,
        todos: newTodos,
      };
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);
      setBoardState({ ...board, columns: newColumns });
    } else {
      // dragging to another column
      const finishTodos = Array.from(endCol.todos);
      finishTodos.splice(destination.index, 0, todoMoved);
      const newColumns = new Map(board.columns);
      const newCol: IColumn = {
        id: startCol.id,
        todos: newTodos,
      };
      newColumns.set(startCol.id, newCol);
      newColumns.set(endCol.id, { id: endCol.id, todos: finishTodos });

      updateTask(todoMoved, endCol.id);

      setBoardState({ ...board, columns: newColumns });
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto" {...provided.droppableProps} ref={provided.innerRef}>
            {Array.from(board.columns.entries()).map(([id, column], i) => (
              <Column key={id} id={id} todos={column.todos} index={i} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
