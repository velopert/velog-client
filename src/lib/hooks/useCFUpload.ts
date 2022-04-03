import { useCallback, useState } from 'react';
import { uploadImage } from '../api/files';
import { useJazzbar } from '../jazzbar';

export function useCFUpload() {
  const [setProgress] = useJazzbar();
  const [image, setImage] = useState<string | null>(null);

  const upload = useCallback(
    async (file: File, info: { type: 'post' | 'profile'; refId?: string }) => {
      const data = await uploadImage(file, info, setProgress);
      setImage(data.path);
      return data.path;
    },
    [setProgress],
  );

  return {
    image,
    upload,
  };
}
