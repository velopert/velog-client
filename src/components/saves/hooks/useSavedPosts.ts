import useUser from '../../../lib/hooks/useUser';
import { useHistory } from 'react-router';
import { useEffect, useCallback, useState } from 'react';
import usePopup from '../../../lib/hooks/usePopup';
import {
  GET_POST_LIST,
  PartialPost,
  REMOVE_POST,
} from '../../../lib/graphql/post';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import { safe } from '../../../lib/utils';
import useScrollPagination from '../../../lib/hooks/useScrollPagination';
import { toast } from 'react-toastify';

export default function useSavedPosts() {
  const user = useUser();
  const popup = usePopup();
  const history = useHistory();
  const [removeId, setRemoveId] = useState<string | null>(null);
  const [removePost] = useMutation(REMOVE_POST);
  const client = useApolloClient();
  const getPostList = useQuery<{ posts: PartialPost[] }>(GET_POST_LIST, {
    variables: {
      username: user && user.username,
      temp_only: true,
    },
    skip: !user,
    fetchPolicy: 'cache-and-network',
  });

  const onAskRemove = useCallback((id: string) => {
    setRemoveId(id);
  }, []);

  const onCancelRemove = useCallback(() => {
    setRemoveId(null);
  }, []);

  const onConfirmRemove = useCallback(async () => {
    if (!removeId) return;
    try {
      await removePost({
        variables: {
          id: removeId,
        },
      });
      client.writeQuery({
        query: GET_POST_LIST,
        variables: {
          username: user && user.username,
          temp_only: true,
        },
        data: {
          posts: getPostList.data?.posts.filter(p => p.id !== removeId),
        },
      });
      toast.success('포스트가 삭제되었습니다.');
    } catch (e) {
      toast.error('포스트 삭제 실패');
    }

    setRemoveId(null);
  }, [client, getPostList.data, removeId, removePost, user]);

  const handlers = {
    onAskRemove,
    onCancelRemove,
    onConfirmRemove,
  };

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
  const cursor = safe(() => (posts ? posts[posts.length - 1].id : null));

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
      askRemove: false,
      ...handlers,
    };

  return {
    loading: getPostList.loading,
    posts,
    askRemove: !!removeId,
    ...handlers,
  };
}
