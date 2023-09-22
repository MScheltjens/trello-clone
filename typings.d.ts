import { Models } from 'appwrite';

interface IBoard {
  columns: Map<TTypedColumn, IColumn>;
}

type TTypedColumn = 'todo' | 'inprogress' | 'done';

interface IColumn {
  id: TTypedColumn;
  todos: ITodo[];
}

interface ITodo {
  $id: string;
  $createdAt: string;
  title: string;
  status: TTypedColumn;
  image?: IImage;
}

interface IImage {
  bucketId: string;
  fileId: string;
}
