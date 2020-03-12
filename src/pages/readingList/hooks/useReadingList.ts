import {
  GET_READING_LIST,
  GetReadingListResponse,
} from '../../../lib/graphql/post';
import { useQuery } from '@apollo/react-hooks';
import { useCallback, useState, useEffect } from 'react';
import useScrollPagination from '../../../lib/hooks/useScrollPagination';

export default function useReadingList(type: 'liked' | 'read') {
  const { data, loading, fetchMore } = useQuery<GetReadingListResponse>(
    GET_READING_LIST,
    {
      variables: {
        type: type.toUpperCase(),
        limit: 20,
      },
    },
  );
  const [isFinished, setIsFinished] = useState(false);
  useEffect(() => {
    setIsFinished(false);
  }, [type]);

  const onLoadMore = useCallback(
    (cursor: string) => {
      fetchMore({
        variables: {
          type: type.toUpperCase(),
          cursor,
          limit: 24,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          if (fetchMoreResult.readingList.length === 0) {
            setIsFinished(true);
          }
          return {
            readingList: [...prev.readingList, ...fetchMoreResult.readingList],
          };
        },
      });
    },
    [fetchMore, type],
  );

  const cursor = data?.readingList[data?.readingList.length - 1]?.id;

  useScrollPagination({
    cursor,
    onLoadMore,
  });

  return { data, loading, isFinished };
}
