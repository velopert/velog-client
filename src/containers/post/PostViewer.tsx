import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  READ_POST,
  SinglePost,
  REMOVE_POST,
  LIKE_POST,
  UNLIKE_POST,
  LinkedPost,
} from '../../lib/graphql/post';
import PostHead from '../../components/post/PostHead';
import PostContent from '../../components/post/PostContent';
import PostComments from './PostComments';
import { postActions } from '../../modules/post';
import PostViewerProvider from '../../components/post/PostViewerProvider';
import { useUserId } from '../../lib/hooks/useUser';
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { prepareEdit } from '../../modules/write';
import PostLikeShareButtons from '../../components/post/PostLikeShareButtons';
import gql from 'graphql-tag';
import { shareFacebook, shareTwitter, copyText } from '../../lib/share';
import PostToc from '../../components/post/PostToc';
import LinkedPostList from '../../components/post/LinkedPostList';
import { getScrollTop } from '../../lib/utils';
import UserProfile from '../../components/common/UserProfile';
import VelogResponsive from '../../components/velog/VelogResponsive';
import styled from 'styled-components';

const UserProfileWrapper = styled(VelogResponsive)`
  margin-top: 6rem;
  margin-bottom: 6rem;
`;

export interface PostViewerOwnProps {
  username: string;
  urlSlug: string;
}
export interface PostViewerProps
  extends PostViewerOwnProps,
    RouteComponentProps {}

const PostViewer: React.FC<PostViewerProps> = ({
  username,
  urlSlug,
  history,
  match,
}) => {
  const userId = useUserId();
  const dispatch = useDispatch();
  const readPost = useQuery<{ post: SinglePost }>(READ_POST, {
    variables: {
      username,
      url_slug: urlSlug,
    },
  });
  const client = useApolloClient();
  const prefetchPost = useCallback(
    ({ username, urlSlug }: { username: string; urlSlug: string }) => {
      client.query({
        query: READ_POST,
        variables: {
          username,
          url_slug: urlSlug,
        },
      });
    },
    [client],
  );
  const prefetched = useRef(false);

  const [removePost] = useMutation(REMOVE_POST);
  const [likePost, { loading: loadingLike }] = useMutation(LIKE_POST);
  const [unlikePost, { loading: loadingUnlike }] = useMutation(UNLIKE_POST);

  const { loading, error, data } = readPost;

  const prefetchLinkedPosts = useCallback(() => {
    if (!data || !data.post) return;
    if (prefetched.current) return;
    const { linked_posts: linkedPosts } = data.post;
    const { next, previous } = linkedPosts;
    const getVariables = (post: LinkedPost) => ({
      username: post.user.username,
      urlSlug: post.url_slug,
    });
    if (next) {
      prefetchPost(getVariables(next));
    }
    if (previous) {
      prefetchPost(getVariables(previous));
    }
  }, [data, prefetchPost]);

  const onScroll = useCallback(() => {
    const scrollTop = getScrollTop();
    const { scrollHeight } = document.body;
    const { innerHeight } = window;
    const percentage = ((scrollTop + innerHeight) / scrollHeight) * 100;
    if (percentage > 50) {
      prefetchLinkedPosts();
    }
  }, [prefetchLinkedPosts]);

  useEffect(() => {
    if (!data) return;
    if (!data.post) return;

    // schedule post prefetch
    const timeoutId = setTimeout(prefetchLinkedPosts, 1000 * 5);

    dispatch(postActions.setPostId(data.post.id));

    prefetched.current = false;

    return () => {
      clearTimeout(timeoutId);
    };
  }, [data, dispatch, prefetchLinkedPosts]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  const onRemove = async () => {
    if (!data || !data.post) return;
    try {
      await removePost({
        variables: {
          id: data.post.id,
        },
      });
      client.resetStore();
      history.push('/');
    } catch (e) {}
  };

  if (error) {
    console.log(error);
    return null;
  }

  const onEdit = () => {
    if (!data) return;
    const { post } = data;
    dispatch(
      prepareEdit({
        id: post.id,
        body: post.body,
        description: post.short_description,
        isMarkdown: post.is_markdown,
        isPrivate: post.is_private,
        series: post.series
          ? {
              id: post.series.id,
              name: post.series.name,
            }
          : null,
        tags: post.tags,
        title: post.title,
        urlSlug: post.url_slug,
      }),
    );
    history.push('/write');
  };

  const onLikeToggle = async () => {
    if (loadingLike || loadingUnlike) return;
    const variables = {
      id: post.id,
    };
    const likeFragment = gql`
      fragment post on Post {
        liked
        likes
      }
    `;

    // IF SPLITTED TO ANOTHER CONTAINER
    // const data = client.readFragment<{ liked: boolean; likes: number }>({
    //   id: `Post:${post.id}`,
    //   fragment: likeFragment
    // });

    try {
      if (post.liked) {
        client.writeFragment({
          id: `Post:${post.id}`,
          fragment: likeFragment,
          data: {
            liked: false,
            likes: post.likes - 1,
            __typename: 'Post',
          },
        });
        await unlikePost({
          variables,
        });
      } else {
        client.writeFragment({
          id: `Post:${post.id}`,
          fragment: likeFragment,
          data: {
            liked: true,
            likes: post.likes + 1,
            __typename: 'Post',
          },
        });
        await likePost({
          variables,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onShareClick = (type: 'facebook' | 'twitter' | 'clipboard') => {
    const { url } = match;
    const link = `https://velog.io${url}`;

    switch (type) {
      case 'facebook':
        shareFacebook(link);
        break;
      case 'twitter':
        const ownPost = post.user.id === userId;
        const message = ownPost
          ? `제가 velog 에 게재한 "${post.title}" 포스트를 읽어보세요.`
          : `${post.user.username}님이 velog 에 게재한 "${
              post.title
            }" 포스트를 읽어보세요.`;

        shareTwitter(link, message);
        break;
      case 'clipboard':
        copyText(link);
        break;
      default:
    }
  };

  if (loading) return null;
  if (!data) return null;

  const { post } = data;

  return (
    <PostViewerProvider prefetchLinkedPosts={prefetchLinkedPosts}>
      <PostHead
        title={post.title}
        tags={post.tags}
        username={username}
        date={post.released_at}
        thumbnail={post.thumbnail}
        series={post.series}
        hideThumbnail={!!post.thumbnail && post.body.includes(post.thumbnail)}
        postId={post.id}
        ownPost={post.user.id === userId}
        onRemove={onRemove}
        onEdit={onEdit}
        shareButtons={
          <PostLikeShareButtons
            onLikeToggle={onLikeToggle}
            onShareClick={onShareClick}
            likes={post.likes}
            liked={post.liked}
            postId={post.id}
          />
        }
        toc={<PostToc />}
      />
      <PostContent isMarkdown={post.is_markdown} body={post.body} />
      <UserProfileWrapper>
        <UserProfile
          thumbnail={post.user.profile.thumbnail}
          displayName={post.user.profile.display_name}
          description={post.user.profile.short_bio}
          profileLinks={post.user.profile.profile_links}
        />
      </UserProfileWrapper>
      <LinkedPostList linkedPosts={post.linked_posts} />
      <PostComments
        count={post.comments_count}
        comments={post.comments}
        postId={post.id}
      />
    </PostViewerProvider>
  );
};

export default withRouter(PostViewer);
