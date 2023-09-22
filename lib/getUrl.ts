import { storage } from '@/config';
import { IImage } from '@/typings';

export const getUrl = async (image: IImage) => storage.getFilePreview(image.bucketId, image.fileId);
