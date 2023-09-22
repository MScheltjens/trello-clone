import { create } from 'zustand';

interface IBoardState {
  board: IBoard;
  getBoard: () => void;
}

const useBoardStore = create((set) => ({
  board: null,
  getBoard: () => {},
}));
