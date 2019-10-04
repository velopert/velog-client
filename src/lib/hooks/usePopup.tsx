import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { openPopup } from '../../modules/core';

export default function usePopup() {
  const dispatch = useDispatch();
  type Params = Parameters<typeof openPopup>;

  const open = useCallback(
    (params: Params[0]) => {
      dispatch(openPopup(params));
    },
    [dispatch],
  );

  return { open };
}
