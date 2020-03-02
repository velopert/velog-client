import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { showAuthModal } from '../../../modules/core';
import { RootState } from '../../../modules';
import { logout } from '../../../lib/api/auth';
import storage from '../../../lib/storage';

export default function useHeader() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.core.user);

  const onLoginClick = useCallback(() => {
    dispatch(showAuthModal('LOGIN'));
  }, [dispatch]);

  const onLogout = useCallback(async () => {
    try {
      await logout();
    } catch {}
    storage.removeItem('CURRENT_USER');
    window.location.href = '/';
  }, []);

  return { user, onLoginClick, onLogout };
}
