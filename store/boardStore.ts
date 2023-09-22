import { getTodosGroupedByColumn } from '@/lib';
import { IBoard, IColumn, TTypedColumn } from '@/typings';
import { create } from 'zustand';

interface IBoardState {
  board: IBoard;
  getBoard: () => void;
  setBoardState: (board: IBoard) => void;
}

export const useBoardStore = create<IBoardState>((set) => ({
  board: {
    columns: new Map<TTypedColumn, IColumn>(),
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),
}));
