import { databases, storage } from '@/config';
import { getTodosGroupedByColumn } from '@/lib';
import { IBoard, IColumn, ITodo, TTypedColumn } from '@/typings';
import { create } from 'zustand';

interface IBoardState {
  board: IBoard;
  getBoard: () => void;
  setBoardState: (board: IBoard) => void;

  updateTodoDB: (todo: ITodo, columnId: string) => void;
  deleteTodo: (todoIndex: number, todo: ITodo, id: TTypedColumn) => void;

  searchString: string;
  setSearchString: (searchString: string) => void;
}

export const useBoardStore = create<IBoardState>((set, get) => ({
  board: {
    columns: new Map<TTypedColumn, IColumn>(),
  },

  searchString: '',
  setSearchString: (searchString) => set({ searchString }),

  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },

  setBoardState: (board) => set({ board }),

  updateTodoDB: async (todo, columnId) => {
    await databases.updateDocument(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!, todo.$id, {
      title: todo.title,
      status: columnId,
    });
  },

  deleteTodo: async (todoIndex, todo, id) => {
    const newColumns = new Map(get().board.columns);
    // delete todoId from newColumns
    newColumns.get(id)?.todos.splice(todoIndex, 1);
    set({ board: { columns: newColumns } });

    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }

    await databases.deleteDocument(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!, todo.$id);
  },
}));
