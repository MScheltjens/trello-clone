'use client';

import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useModalStore } from '@/store/modalStore';
import { useBoardStore } from '@/store';
import { TaskTypeRadioGroup } from '../taskTypeRadioGroup/TaskTypeRadioGroup';
import Image from 'next/image';
import { PhotoIcon } from '@heroicons/react/20/solid';

export const Modal = () => {
  const imagePickerRef = useRef<HTMLInputElement>(null);
  const [addTask, newTaskInput, setNewTaskInput, newTaskType, image, setImage] = useBoardStore((state) => [state.addTask, state.newTaskInput, state.setNewTaskInput, state.newTaskType, state.image, state.setImage]);
  const [isOpen, closeModal] = useModalStore((state) => [state.isOpen, state.closeModal]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTaskInput) return;
    addTask(newTaskInput, newTaskType, image);
    setImage(null);
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="form" className="relative z-10" onClose={closeModal} onSubmit={handleSubmit}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 pb-2">
                  Add a task
                </Dialog.Title>
                <div className="mt-2">
                  <input type="text" value={newTaskInput} onChange={(e) => setNewTaskInput(e.target.value)} className="w-full border border-gray-300 rounded-md outline-none p-5" />
                </div>
                <TaskTypeRadioGroup />

                <div>
                  <button
                    type="button"
                    onClick={() => {
                      imagePickerRef.current?.click();
                    }}
                    className="w-full border border-gray-300 rounded-md outline-none p-5 focus-viusible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <PhotoIcon className="h-6 w-6 mr-2 inline-block" />
                    Upload Image
                  </button>

                  {image && <Image src={URL.createObjectURL(image)} alt="uploaded image" width={200} height={200} onClick={() => setImage(null)} className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed" />}

                  <input
                    type="file"
                    ref={imagePickerRef}
                    hidden
                    onChange={(e) => {
                      if (!e.target.files![0].type.startsWith('image/')) return;
                      setImage(e.target.files![0]);
                    }}
                  />
                </div>

                <div className="mt-4">
                  <button type="submit" disabled={!newTaskInput} className="inline-flex justify-center rounded-md border border-transparent bg-blue px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled: bg-gray-100 disabled:text-gray-300 dsabled:cursor-not-allowed">
                    Add Task
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
