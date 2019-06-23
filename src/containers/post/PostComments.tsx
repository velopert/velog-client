import * as React from 'react';
import PostCommentsTemplate from '../../components/post/PostCommentsTemplate';
import PostCommentsWriteContainer from './PostCommentsWriteContainer';
import { Comment } from '../../lib/graphql/post';
import PostCommentsList from '../../components/post/PostCommentsList';
import styled from 'styled-components';
import { useUserId } from '../../lib/hooks/useUser';

export interface PostCommentsProps {
  comments: Comment[];
  postId: string;
}

const MarginTop = styled.div`
  margin-top: 2.5rem;
`;

const PostComments: React.FC<PostCommentsProps> = ({ comments, postId }) => {
  const currentUserId = useUserId();

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
