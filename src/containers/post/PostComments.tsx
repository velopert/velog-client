import * as React from 'react';
import PostCommentsTemplate from '../../components/post/PostCommentsTemplate';
import PostCommentsWriteContainer from './PostCommentsWriteContainer';
import { Comment, REMOVE_COMMENT } from '../../lib/graphql/post';
import PostCommentsList from '../../components/post/PostCommentsList';
import styled from 'styled-components';
import { useUserId } from '../../lib/hooks/useUser';
import { useMutation } from 'react-apollo-hooks';

export interface PostCommentsProps {
  comments: Comment[];
  postId: string;
}

const MarginTop = styled.div`
  margin-top: 2.5rem;
`;

const PostComments: React.FC<PostCommentsProps> = ({ comments, postId }) => {
  const currentUserId = useUserId();
  const removeComment = useMutation(REMOVE_COMMENT);

  const onRemove = async (id: string) => {
    await removeComment({ variables: { id } });
  };

  return (
    <PostCommentsTemplate count={comments.length}>
      <PostCommentsWriteContainer postId={postId} />
      <MarginTop>
        <PostCommentsList comments={comments} currentUserId={currentUserId} />
      </MarginTop>
    </PostCommentsTemplate>
  );
};

export default PostComments;
