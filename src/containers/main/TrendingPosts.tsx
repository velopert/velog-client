import React, { useCallback } from 'react';
import PostCardList, {
  PostCardListSkeleton,
} from '../../components/common/PostCardList';
import {
  GET_TRENDING_POSTS,
  GetTrendingPostsResponse,
} from '../../lib/graphql/post';
import { useQuery } from '@apollo/react-hooks';
import useScrollPagination from '../../lib/hooks/useScrollPagination';
import { safe } from '../../lib/utils';

interface TrendingPostsProps {}

const TrendingPosts: React.FC<TrendingPostsProps> = props => {
  const getTrendingPosts = useQuery<GetTrendingPostsResponse>(
    GET_TRENDING_POSTS,
  );

  const { data } = getTrendingPosts;
  const onLoadMoreByOffset = useCallback(
    (offset: number) => {
      getTrendingPosts.fetchMore({
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

          console.log(uniquePosts);

          return {
            trendingPosts: [...prev.trendingPosts, ...uniquePosts],
          };
        },
      });
    },
    [getTrendingPosts],
  );

  const offset = safe(() => data!.trendingPosts.length);

  useScrollPagination({
    offset,
    onLoadMoreByOffset,
  });

  if (!data || !data.trendingPosts) return <PostCardListSkeleton />;

  return <PostCardList posts={data.trendingPosts} />;
};

export default TrendingPosts;
