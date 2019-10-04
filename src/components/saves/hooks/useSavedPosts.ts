import useUser from '../../../lib/hooks/useUser';
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import usePopup from '../../../lib/hooks/usePopup';

export default function useSavedPosts() {
  const user = useUser();
  const popup = usePopup();
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      popup.open({
        title: '오류',
        message: '로그인을 해주세요.',
      });
      history.push('/');
      return;
    }
  }, [history, popup, user]);

  if (!user) return null;
}
