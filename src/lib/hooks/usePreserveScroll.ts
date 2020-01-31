import scroll, { ScrollKey } from '../../modules/scroll';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../modules';
import { getScrollTop } from '../utils';
import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function usePreserveScroll(key: ScrollKey) {
  const { action } = useHistory();
  const top = useSelector((state: RootState) => state.scroll[key]);
  const dispatch = useDispatch();
  const preserveScroll = useCallback(() => {
    const scrollTop = getScrollTop();
    dispatch(
      scroll.actions.preserveScroll({
        key,
        top: scrollTop,
      }),
    );
  }, [dispatch, key]);

  useEffect(() => {
    if (top && action === 'POP') {
      window.scrollTo(0, top);
    }
    return () => {
      preserveScroll();
    };
  }, [action, preserveScroll, top]);
}
