import { getUrl } from '@/lib';
import { useBoardStore } from '@/store';
import { ITodo, TTypedColumn } from '@/typings';
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from '@hello-pangea/dnd';
import { XCircleIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Props = {
  todo: ITodo;
  index: number;
  id: TTypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

export const TodoCard = ({ todo, index, id, innerRef, draggableProps, dragHandleProps }: Props) => {
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (todo.image) {
      (async () => {
        const url = await getUrl(todo.image!);
        if (url) setImageUrl(url.toString());
      })();
    }
  }, [todo]);

  return (
    <div className="bg-white rounded-md space-y-2 drop-shadow-md" {...draggableProps} {...dragHandleProps} ref={innerRef}>
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <button className="text-red-500 hover:text-red-600" onClick={() => deleteTask(index, todo, id)}>
          <XCircleIcon className="ml-5 h-8 w-8" />
        </button>
      </div>
      {imageUrl && (
        <div className="h-full w-full rounded-b-md">
          <Image src={imageUrl} alt="Task Image" width={400} height={200} className="w-full object-contain rounded-b-md" />
        </div>
      )}
    </div>
  );
};
