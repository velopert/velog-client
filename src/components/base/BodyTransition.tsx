import React from 'react';
import { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';

const Styles = createGlobalStyle`
  body { 
    transition: background 0.125s ease-in;
  }
`;

function BodyTransition() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setEnabled(true);
    }, 500);
  }, []);

  if (!enabled) return null;
  return <Styles />;
}

export default BodyTransition;
