import { useState, useCallback } from 'react';

const useUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const upload = useCallback(() => {
    console.log('click');
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = () => {
      if (!input.files) return;
      const file = input.files[0];
      setFile(file);
    };
    input.click();
  }, []);
  return [upload, file] as [typeof upload, typeof file];
};

export default useUpload;
