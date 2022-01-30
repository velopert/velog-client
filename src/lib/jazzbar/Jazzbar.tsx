import React, { useContext, useState, useEffect, useCallback } from 'react';
import './Jazzbar.css';
import { JazzbarContext } from '.';

export interface JazzbarProps {}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const Jazzbar: React.FC<JazzbarProps> = (props) => {
  const jazzbar = useContext(JazzbarContext);
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding] = useState(false);
  const [zero, setZero] = useState(false);

  const { value, set } = jazzbar;

  const hide = useCallback(() => {
    setHiding(true);
    const run = async () => {
      await sleep(200);
      setZero(true);
      await sleep(400);
      setHiding(false);
    };
    run();
  }, []);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    if (!visible && ![0, 100].includes(value)) {
      setVisible(true);
    }
    if (value === 100) {
      timeout = setTimeout(hide, 400);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [hide, value, visible]);

  useEffect(() => {
    if (zero) {
      setZero(false);
      set(0);
    }
  }, [set, zero]);

  return (
    <div
      className={['__jazzbar', hiding && 'hiding', zero && 'zero'].join(' ')}
      style={{
        width: `${value}%`,
      }}
    />
  );
};

export default Jazzbar;
