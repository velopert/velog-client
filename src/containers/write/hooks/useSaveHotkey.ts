import { useEffect } from 'react';

export default function useSaveHotKey<T extends Function>(callback: T) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const ctrlOrCmdKey = e.ctrlKey || e.metaKey;
      if (ctrlOrCmdKey && e.keyCode === 83) {
        e.preventDefault();
        callback();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [callback]);
}
