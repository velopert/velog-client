import { useContext } from 'react';
import JazzbarContext from './JazzbarContext';

const useJazzbar = () => {
  const jazzbar = useContext(JazzbarContext);
  const { set, value } = jazzbar;
  return [set, value] as [typeof set, typeof value];
};

export default useJazzbar;
