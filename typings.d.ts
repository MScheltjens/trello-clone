import { Models } from 'appwrite';

interface IBoard {
  columns: Map<TTypedColumn, IColumn>;
}

type TTypedColumn = 'todo' | 'in-progress' | 'done';

interface IColumn {
  id: TTypedColumn;
  todos: ITodo[];
}

interface ITodo {
  $id: string;
  $createdAt: string;
  title: string;
  status: TTypedColumn;
  image?: string;
}

interface IImage {
  bucketId: string;
  fileId: string;
}
