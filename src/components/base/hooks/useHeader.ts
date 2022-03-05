import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { showAuthModal } from '../../../modules/core';
import { RootState } from '../../../modules';
import { logout } from '../../../lib/api/auth';
import storage from '../../../lib/storage';
import { useMutation } from '@apollo/react-hooks';
import { LOGOUT } from '../../../lib/graphql/user';

export default function useHeader() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.core.user);
  const customHeader = useSelector((state: RootState) => state.header);
  const [graphqlLogout] = useMutation(LOGOUT);

  const onLoginClick = useCallback(() => {
    dispatch(showAuthModal('LOGIN'));
  }, [dispatch]);

  const onLogout = useCallback(async () => {
    try {
      await Promise.all([logout(), graphqlLogout()]);
    } catch {}
    storage.removeItem('CURRENT_USER');
    window.location.href = '/';
  }, [graphqlLogout]);

  return { user, onLoginClick, onLogout, customHeader };
}
