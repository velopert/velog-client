import useUser from '../../../lib/hooks/useUser';
import { useHistory } from 'react-router';
import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import usePopup from '../../../lib/hooks/usePopup';
import { GET_POST_LIST, PartialPost } from '../../../lib/graphql/post';
import { useQuery } from '@apollo/react-hooks';
import { safe } from '../../../lib/utils';
import useScrollPagination from '../../../lib/hooks/useScrollPagination';

export default function useSavedPosts() {
  const user = useUser();
  const popup = usePopup();
  const history = useHistory();
  const getPostList = useQuery<{ posts: PartialPost[] }>(GET_POST_LIST, {
    variables: {
      username: user && user.username,
      temp_only: true,
    },
    skip: !user,
    fetchPolicy: 'cache-and-network',
  });
  const onLoadMore = useCallback(
    (cursor: string) => {
      if (!user) return;
      getPostList.fetchMore({
        variables: {
          cursor,
          username: user!.username,
          temp_only: true,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            posts: [...prev.posts, ...fetchMoreResult.posts],
          };
        },
      });
    },
    [getPostList, user],
  );
  const { data } = getPostList;
  const posts = safe(() => data!.posts);
  const cursor = posts ? posts[posts.length - 1].id : null;

  useScrollPagination({
    cursor,
    onLoadMore,
  });

  useEffect(() => {
    if (!user) {
      popup.open({
        title: '오류',
        message: '로그인을 해주세요.',
      });
      history.push('/');
      return;
    }
  }, [history, popup, user]);

  if (!user)
    return {
      loading: false,
      posts: null,
    };

  return {
    loading: getPostList.loading,
    posts,
  };
}
