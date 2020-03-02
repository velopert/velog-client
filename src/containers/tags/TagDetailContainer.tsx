import React, { useCallback, useEffect } from 'react';
import TagDetail, { TagDetailSkeleton } from '../../components/tags/TagDetail';
import { useQuery } from '@apollo/react-hooks';
import { GET_TAG, GetTagResponse } from '../../lib/graphql/tags';
import { GET_POST_LIST, PartialPost } from '../../lib/graphql/post';
import { safe, ssrEnabled } from '../../lib/utils';
import useScrollPagination from '../../lib/hooks/useScrollPagination';
import PostCardList, {
  PostCardListSkeleton,
} from '../../components/common/FlatPostCardList';
import useNotFound from '../../lib/hooks/useNotFound';
import { Helmet } from 'react-helmet-async';

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
    notifyOnNetworkStatusChange: true,
  });

  const { showNotFound } = useNotFound();

  useEffect(() => {
    if (tagDetail.data && !tagDetail.data.tag) {
      showNotFound();
    }
  }, [showNotFound, tagDetail.data]);

  if (ssrEnabled && tagDetail.data && !tagDetail.data.tag) {
    showNotFound();
  }

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

  if (
    !tagDetail.data ||
    !tagDetail.data.tag ||
    !getPostList.data ||
    !getPostList.data.posts
  )
    return (
      <>
        <TagDetailSkeleton />
        <PostCardListSkeleton />
      </>
    );

  return (
    <>
      <Helmet>
        <title>#{tagDetail.data.tag.name} - velog</title>
        <meta
          name="description"
          content={
            tagDetail.data.tag.description ||
            `벨로그에 작성된 포스트들 중 "${tagDetail.data.tag.name}" 태그가 사용된 포스트들의 리스트들을 확인해보세요.`
          }
        />
      </Helmet>
      <TagDetail
        name={tagDetail.data.tag.name}
        thumbnail={tagDetail.data.tag.thumbnail}
        description={tagDetail.data.tag.description}
        count={tagDetail.data.tag.posts_count}
      />
      <PostCardList posts={getPostList.data.posts} />
      {getPostList.loading && <PostCardListSkeleton forLoading />}
    </>
  );
}

export default TagDetailContainer;
