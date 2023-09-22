import { databases } from '@/config';

import { IBoard, IColumn, TTypedColumn } from '@/typings';

export const getTodosGroupedByColumn = async () => {
  const data = await databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!);
  const todos = data.documents;

  // we transform the data from the api to our own format
  const columns = todos.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }
    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      ...(todo.image && { image: JSON.parse(todo.image) }),
    });

    return acc;
  }, new Map<TTypedColumn, IColumn>());

  // if columns dont have in-progress, todo and done, we add them with empty todos

  const columnTypes: TTypedColumn[] = ['todo', 'inprogress', 'done'];

  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }

  // sort columns by columnTypes
  const sortedColumns = new Map<TTypedColumn, IColumn>(Array.from(columns.entries()).sort((a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])));

  const board: IBoard = {
    columns: sortedColumns,
  };

  return board;
};
