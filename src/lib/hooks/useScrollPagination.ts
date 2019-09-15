import { useRef, useCallback, useEffect } from 'react';
import { getScrollBottom } from '../utils';

type Params = {
  cursor: string | null;
  onLoadMore: (cursor: string) => any;
};

export default function useScrollPagination({ cursor, onLoadMore }: Params) {
  const lastCursor = useRef<string | null>(null);

  const loadMore = useCallback(() => {
    if (!cursor) return;
    if (cursor === lastCursor.current) return;
    onLoadMore(cursor);
    lastCursor.current = cursor;
  }, [cursor, onLoadMore]);

  const onScroll = useCallback(() => {
    const scrollBottom = getScrollBottom();
    if (scrollBottom < 768) {
      loadMore();
    }
  }, [loadMore]);

  useEffect(() => {
    console.log('register scroll event');
    window.addEventListener('scroll', onScroll);
    return () => {
      console.log('unregister scroll event');
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);
}
