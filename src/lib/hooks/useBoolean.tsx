import { useState, useCallback } from 'react';

const useBoolean = (initialValue: boolean) => {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue(value => !value), []);

  return [value, toggle, setValue] as [
    typeof value,
    typeof toggle,
    typeof setValue
  ];
};

export default useBoolean;
