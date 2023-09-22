import { IBoard, ITodo, TTypedColumn } from '@/typings';

// specify the data for chatGPT to make as less mistakes as possible

export const formatTodosForAi = (board: IBoard) => {
  const todos = Array.from(board.columns.entries());

  const flatArray = todos.reduce((map, [key, value]) => {
    map[key] = value.todos;
    return map;
  }, {} as { [key in TTypedColumn]: ITodo[] });

  // this step is not really necessary, but to make sure chatGPT doesn't make mistakes...

  const flatArrayCounted = Object.entries(flatArray).reduce((map, [key, value]) => {
    map[key as TTypedColumn] = value.length;
    return map;
  }, {} as { [key in TTypedColumn]: number });

  return flatArrayCounted;
};
