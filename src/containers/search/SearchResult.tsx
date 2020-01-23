import React, { useCallback } from 'react';
import SearchResultInfo from '../../components/search/SearchResultInfo';
import PostCardList from '../../components/common/PostCardList';
import { useQuery } from '@apollo/react-hooks';
import { SearchPostsResponse, SEARCH_POSTS } from '../../lib/graphql/post';
import useScrollPagination from '../../lib/hooks/useScrollPagination';
import { safe } from '../../lib/utils';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
// import { undrawSearching } from '../../static/images';

export interface SearchResultProps {
  keyword: string;
  username?: string;
}

function SearchResult({ keyword, username }: SearchResultProps) {
  const { data, fetchMore } = useQuery<SearchPostsResponse>(SEARCH_POSTS, {
    variables: {
      keyword,
      username,
    },
    skip: keyword === '',
  });

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
            searchPosts: {
              ...prev.searchPosts,
              posts: prev.searchPosts.posts.concat(
                fetchMoreResult.searchPosts.posts,
              ),
            },
          };
        },
      });
    },
    [fetchMore, keyword],
  );

  const offset = safe(() => data!.searchPosts!.posts!.length) || 0;
  useScrollPagination({
    offset,
    onLoadMoreByOffset,
  });

  // if (!keyword) {
  //   return (
  //     <ImageWrapper>
  //       <img src={undrawSearching} alt="search keyword" />
  //     </ImageWrapper>
  //   );
  // }

  if (!data || !data.searchPosts) return null;

  return (
    <>
      <Helmet>
        <title>{`"${keyword}" 검색 결과 - velog`}</title>
      </Helmet>
      <SearchResultInfo count={data.searchPosts.count} />
      <PostCardList posts={data.searchPosts.posts} hideUser={!!username} />
    </>
  );
}

const ImageWrapper = styled.div`
  padding-top: 3rem;
  padding-bottom: 3rem;
  display: flex;
  justify-content: center;
  img {
    width: 16rem;
    height: auto;
    display: block;
  }
`;

export default SearchResult;
