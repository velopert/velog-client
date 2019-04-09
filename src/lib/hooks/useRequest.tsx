import { useState } from 'react';
import { AxiosPromise } from 'axios';

type PromiseCreator<R> = (...params: any[]) => AxiosPromise<R>;

type UseRequestReturnType<R> = [
  Function,
  boolean,
  R | null,
  Error | null,
  () => void
];

export default function useRequest<R = any>(
  promiseCreator: PromiseCreator<R>,
): UseRequestReturnType<R> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<R | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const onRequest = async (...params: any[]) => {
    try {
      setLoading(true);
      const response = await promiseCreator(...params);
      setData(response.data);
    } catch (e) {
      setError(error);
      throw e;
    }
    setLoading(false);
  };

  const onReset = () => {
    setLoading(false);
    setData(null);
    setError(null);
  };

  return [onRequest, loading, data, error, onReset];
}
