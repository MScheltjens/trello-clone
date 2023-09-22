import { databases } from '@/config';
import { getTodosGroupedByColumn } from '@/lib';
import { IBoard, IColumn, ITodo, TTypedColumn } from '@/typings';
import { create } from 'zustand';

interface IBoardState {
  board: IBoard;
  getBoard: () => void;
  setBoardState: (board: IBoard) => void;
  updateTodoDB: (todo: ITodo, columnId: string) => void;

  searchString: string;
  setSearchString: (searchString: string) => void;
}

export const useBoardStore = create<IBoardState>((set) => ({
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
}));
