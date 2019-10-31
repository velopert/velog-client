import React, { useCallback } from 'react';
import TagDetail from '../../components/tags/TagDetail';
import { useQuery } from '@apollo/react-hooks';
import { GET_TAG, GetTagResponse } from '../../lib/graphql/tags';
import { GET_POST_LIST, PartialPost } from '../../lib/graphql/post';
import { safe } from '../../lib/utils';
import useScrollPagination from '../../lib/hooks/useScrollPagination';
import PostCardList from '../../components/common/PostCardList';

export type TagDetailContainerProps = {
  tag: string;
};

function TagDetailContainer({ tag }: TagDetailContainerProps) {
  const tagDetail = useQuery<GetTagResponse>(GET_TAG, {
    variables: {
      name: tag,
    },
  });
  const getPostList = useQuery<{ posts: PartialPost[] }>(GET_POST_LIST, {
    variables: {
      tag,
    },
  });

  const onLoadMore = useCallback(
    (cursor: string) => {
      getPostList.fetchMore({
        variables: {
          cursor,
          tag,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            posts: [...prev.posts, ...fetchMoreResult.posts],
          };
        },
      });
    },
    [getPostList, tag],
  );

  const cursor = safe(
    () => getPostList.data!.posts[getPostList.data!.posts.length - 1].id,
  );

  useScrollPagination({
    cursor,
    onLoadMore,
  });

  if (!tagDetail.data || !tagDetail.data.tag) return null;
  if (!getPostList.data || !getPostList.data.posts) return null;

  return (
    <>
      <TagDetail
        name={tagDetail.data.tag.name}
        thumbnail={tagDetail.data.tag.thumbnail}
        description={tagDetail.data.tag.description}
        count={tagDetail.data.tag.posts_count}
      />
      <PostCardList posts={getPostList.data.posts} />
    </>
  );
}

export default TagDetailContainer;
