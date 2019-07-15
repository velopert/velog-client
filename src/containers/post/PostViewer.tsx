import React, {
  createContext,
  useReducer,
  Dispatch,
  useContext,
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Query, QueryResult } from 'react-apollo';
import { READ_POST, SinglePost, REMOVE_POST } from '../../lib/graphql/post';
import PostHead from '../../components/post/PostHead';
import PostContent from '../../components/post/PostContent';
import PostComments from './PostComments';
import { RootState } from '../../modules';
import { postActions } from '../../modules/post';
import PostViewerProvider from '../../components/post/PostViewerProvider';
import { useUserId } from '../../lib/hooks/useUser';
import { useQuery, useMutation } from 'react-apollo-hooks';

export interface PostViewerProps {
  username: string;
  urlSlug: string;
}

const PostViewer: React.FC<PostViewerProps> = ({ username, urlSlug }) => {
  const userId = useUserId();
  const dispatch = useDispatch();
  const readPost = useQuery<{ post: SinglePost }>(READ_POST, {
    variables: {
      username,
      url_slug: urlSlug,
    },
  });
  const removePost = useMutation(REMOVE_POST);

  const { loading, error, data } = readPost;

  useEffect(() => {
    if (!data) return;
    if (!data.post) return;
    dispatch(postActions.setPostId(data.post.id));
  }, [data, dispatch]);

  const onRemove = () => {
    if (!data || !data.post) return;
    removePost({
      variables: {
        id: data.post.id,
      },
    });
  };

  if (error) {
    console.log(error);
    return null;
  }

  if (loading) return null;
  if (!data) return null;

  const { post } = data;

  return (
    <PostViewerProvider>
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
      />
      <PostContent isMarkdown={post.is_markdown} body={post.body} />
      <PostComments
        count={post.comments_count}
        comments={post.comments}
        postId={post.id}
      />
    </PostViewerProvider>
  );
};

export default PostViewer;
