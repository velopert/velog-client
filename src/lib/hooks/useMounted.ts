import { useState, useEffect, useRef } from 'react';

export default function useMounted() {
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    }
  }, []);
  return mounted;
}
