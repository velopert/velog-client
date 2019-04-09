import { useState, useCallback, ChangeEventHandler } from 'react';

export default function useInput(defaultValue: string) {
  const [input, setInput] = useState(defaultValue);
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    setInput(e.target.value);
  }, []);
  return [input, onChange] as [string, typeof onChange];
}
