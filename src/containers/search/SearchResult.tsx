import React, { useCallback } from 'react';
import SearchResultInfo from '../../components/search/SearchResultInfo';
import PostCardList from '../../components/common/PostCardList';
import { useQuery } from '@apollo/react-hooks';
import { SearchPostsResponse, SEARCH_POSTS } from '../../lib/graphql/post';
import useScrollPagination from '../../lib/hooks/useScrollPagination';
import { safe } from '../../lib/utils';

export interface SearchResultProps {
  keyword: string;
}

function SearchResult({ keyword }: SearchResultProps) {
  const { data, loading, error, fetchMore } = useQuery<SearchPostsResponse>(
    SEARCH_POSTS,
    {
      variables: {
        keyword,
      },
      skip: keyword === '',
    },
  );

  const onLoadMoreByOffset = useCallback(
    (offset: number) => {
      fetchMore({
        variables: {
          keyword,
          offset,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            searchPost: {
              ...prev.searchPost,
              posts: prev.searchPost.posts.concat(
                fetchMoreResult.searchPost.posts,
              ),
            },
          };
        },
      });
    },
    [fetchMore, keyword],
  );

  const offset = safe(() => data!.searchPost!.posts!.length) || 0;
  useScrollPagination({
    offset,
    onLoadMoreByOffset,
  });

  if (!data || !data.searchPost) return null;

  return (
    <>
      <SearchResultInfo count={data.searchPost.count} />
      <PostCardList posts={data.searchPost.posts} />
    </>
  );
}

export default SearchResult;
