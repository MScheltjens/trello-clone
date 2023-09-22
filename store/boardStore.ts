import { ID, databases, storage } from '@/config';
import { getTodosGroupedByColumn, uploadImage } from '@/lib';
import { IBoard, IColumn, IImage, ITodo, TTypedColumn } from '@/typings';
import { create } from 'zustand';

interface IBoardState {
  board: IBoard;
  getBoard: () => void;
  setBoardState: (board: IBoard) => void;

  searchString: string;
  setSearchString: (searchString: string) => void;

  newTaskInput: string;
  setNewTaskInput: (newTaskInput: string) => void;

  newTaskType: TTypedColumn;
  setNewTaskType: (columnId: TTypedColumn) => void;

  image: File | null;
  setImage: (image: File | null) => void;

  addTask: (todo: string, columnId: TTypedColumn, image?: File | null) => void;
  updateTask: (todo: ITodo, columnId: string) => void;
  deleteTask: (todoIndex: number, todo: ITodo, id: TTypedColumn) => void;
}

export const useBoardStore = create<IBoardState>((set, get) => ({
  board: {
    columns: new Map<TTypedColumn, IColumn>(),
  },

  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },

  setBoardState: (board) => set({ board }),

  searchString: '',
  setSearchString: (searchString) => set({ searchString }),

  newTaskInput: '',
  setNewTaskInput: (newTaskInput) => set({ newTaskInput }),

  newTaskType: 'todo',
  setNewTaskType: (columnId) => set({ newTaskType: columnId }),

  image: null,
  setImage: (image) => set({ image }),

  addTask: async (todo, columnId, image) => {
    let file: IImage | undefined;

    if (image) {
      const fileUploaded = await uploadImage(image);
      if (fileUploaded) {
        file = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id,
        };
      }
    }

    const { $id } = await databases.createDocument(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!, ID.unique(), {
      title: todo,
      status: columnId,
      // include img if exists
      ...(file && { image: JSON.stringify(file) }),
    });

    set({ newTaskInput: '' });

    set((state) => {
      const newColumns = new Map<TTypedColumn, IColumn>(state.board.columns);
      const newTodo: ITodo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo,
        status: columnId,
        // include img if exists
        ...(file && { image: file }),
      };
      const column = newColumns.get(columnId);
      if (!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo],
        });
      } else {
        newColumns.get(columnId)?.todos.push(newTodo);
      }
      return { board: { columns: newColumns } };
    });
  },

  updateTask: async (todo, columnId) => {
    await databases.updateDocument(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!, todo.$id, {
      title: todo.title,
      status: columnId,
    });
  },

  deleteTask: async (todoIndex, todo, id) => {
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
