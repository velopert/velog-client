import {
  GET_TRENDING_POSTS,
  GetTrendingPostsResponse,
} from '../../../lib/graphql/post';
import { useQuery } from '@apollo/react-hooks';
import { useCallback } from 'react';
import useScrollPagination from '../../../lib/hooks/useScrollPagination';

export default function useTrendingPosts() {
  const { data, loading, fetchMore } = useQuery<GetTrendingPostsResponse>(
    GET_TRENDING_POSTS,
  );

  const onLoadMoreByOffset = useCallback(
    (offset: number) => {
      fetchMore({
        variables: {
          offset,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          // filter unique posts
          const idMap: Record<string, boolean> = prev.trendingPosts.reduce(
            (acc, current) => {
              Object.assign(acc, { [current.id]: true });
              return acc;
            },
            {},
          );

          const uniquePosts = fetchMoreResult.trendingPosts.filter(
            post => !idMap[post.id],
          );

          return {
            trendingPosts: [...prev.trendingPosts, ...uniquePosts],
          };
        },
      });
    },
    [fetchMore],
  );

  useScrollPagination({
    offset: data?.trendingPosts.length,
    onLoadMoreByOffset,
  });

  return { data, loading };
}
