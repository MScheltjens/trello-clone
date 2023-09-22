import { ID, storage } from '@/config';

export const uploadImage = async (file: File) => {
  if (!file) return;
  return await storage.createFile(process.env.NEXT_PUBLIC_IMAGE_STORAGE_ID!, ID.unique(), file);
};
