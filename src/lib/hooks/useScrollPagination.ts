import { useRef, useCallback, useEffect } from 'react';
import { getScrollBottom } from '../utils';

type Params = {
  offset?: number | null;
  cursor?: string | null;
  stop?: boolean;
  onLoadMore?: (cursor: string) => any;
  onLoadMoreByOffset?: (offset: number) => any;
};

export default function useScrollPagination({
  cursor,
  stop,
  offset,
  onLoadMore,
  onLoadMoreByOffset,
}: Params) {
  const last = useRef<string | number | null>(null);

  const loadMore = useCallback(() => {
    if (!cursor || !onLoadMore) return;
    if (cursor === last.current) return;
    onLoadMore(cursor);
    last.current = cursor;
  }, [cursor, onLoadMore]);

  const loadMoreUsingOffset = useCallback(() => {
    if (stop || !offset || !onLoadMoreByOffset) return;
    if (offset === last.current) return;
    onLoadMoreByOffset(offset);
    last.current = offset;
  }, [offset, onLoadMoreByOffset, stop]);

  const onScroll = useCallback(() => {
    const scrollBottom = getScrollBottom();
    if (scrollBottom < 768) {
      loadMore();
      loadMoreUsingOffset();
    }
  }, [loadMore, loadMoreUsingOffset]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);
}
