import { useQuery } from '@apollo/react-hooks';
import { GET_POST_LIST, PartialPost } from '../../../lib/graphql/post';
import { useCallback } from 'react';
import useScrollPagination from '../../../lib/hooks/useScrollPagination';

export default function useRecentPosts() {
  const { data, loading, fetchMore } = useQuery<{ posts: PartialPost[] }>(
    GET_POST_LIST,
    {},
  );

  const onLoadMore = useCallback(
    (cursor: string) => {
      fetchMore({
        variables: {
          cursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            posts: [...prev.posts, ...fetchMoreResult.posts],
          };
        },
      });
    },
    [fetchMore],
  );

  const cursor = data?.posts[data?.posts.length - 1]?.id;

  useScrollPagination({
    cursor,
    onLoadMore,
  });

  return { data, loading };
}
