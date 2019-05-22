import React, { createContext, useState } from 'react';
import Jazzbar from './Jazzbar';

interface JazzbarContextValue {
  value: number;
  set(value: number): void;
}

const JazzbarContext = createContext<JazzbarContextValue>({
  value: 0,
  set: () => {},
});

export const JazzbarProvider: React.FC<{}> = ({ children }) => {
  const [value, setValue] = useState(0);
  return (
    <JazzbarContext.Provider
      value={{
        value,
        set: setValue,
      }}
    >
      <Jazzbar />
      {children}
    </JazzbarContext.Provider>
  );
};

export default JazzbarContext;
