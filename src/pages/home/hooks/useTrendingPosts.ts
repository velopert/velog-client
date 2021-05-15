import {
  GET_TRENDING_POSTS,
  GetTrendingPostsResponse,
} from '../../../lib/graphql/post';
import { useQuery } from '@apollo/react-hooks';
import { useCallback, useState } from 'react';
import useScrollPagination from '../../../lib/hooks/useScrollPagination';
import { useTimeframe } from '../../../components/home/hooks/useTimeframe';

export default function useTrendingPosts() {
  const [timeframe] = useTimeframe();
  const { data, loading, fetchMore } = useQuery<GetTrendingPostsResponse>(
    GET_TRENDING_POSTS,
    {
      variables: {
        limit: 24,
        timeframe: timeframe,
      },
      // https://github.com/apollographql/apollo-client/issues/1617
      notifyOnNetworkStatusChange: true,
    },
  );
  const [isFinished, setIsFinished] = useState(false);

  const onLoadMoreByOffset = useCallback(
    (offset: number) => {
      fetchMore({
        variables: {
          offset,
          limit: 24,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          if (fetchMoreResult.trendingPosts.length === 0) {
            setIsFinished(true);
          }

          // filter unique posts
          const idMap: Record<string, boolean> = prev.trendingPosts.reduce(
            (acc, current) => {
              Object.assign(acc, { [current.id]: true });
              return acc;
            },
            {},
          );

          const uniquePosts = fetchMoreResult.trendingPosts.filter(
            (post) => !idMap[post.id],
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

  return { data, loading, isFinished };
}
