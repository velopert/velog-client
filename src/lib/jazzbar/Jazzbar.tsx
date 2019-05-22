import React, { useContext, useState, useEffect, useCallback } from 'react';
import './Jazzbar.css';
import { JazzbarContext } from '.';

export interface JazzbarProps {}

const Jazzbar: React.FC<JazzbarProps> = props => {
  const jazzbar = useContext(JazzbarContext);
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding] = useState(false);
  const [zero, setZero] = useState(false);

  const { value, set } = jazzbar;

  const hide = useCallback(() => {
    setHiding(true);
    setTimeout(() => {
      setHiding(false);
      setZero(true);
    }, 200);
  }, []);

  useEffect(() => {
    let timeout: number | null = null;
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
