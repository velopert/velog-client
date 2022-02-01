import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { openPopup } from '../../modules/core';

type Params = Parameters<typeof openPopup>;

export default function usePopup() {
  const dispatch = useDispatch();

  const open = useCallback(
    (params: Params[0]) => {
      dispatch(openPopup(params));
    },
    [dispatch],
  );

  return { open };
}
