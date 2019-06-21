import * as React from 'react';
import PostCommentsTemplate from '../../components/post/PostCommentsTemplate';
import PostCommentsWriteContainer from './PostCommentsWriteContainer';
import { Comment, WRITE_COMMENT } from '../../lib/graphql/post';
import PostCommentsList from '../../components/post/PostCommentsList';
import { MutationResult, Mutation } from 'react-apollo';
import styled from 'styled-components';

export interface PostCommentsProps {
  comments: Comment[];
  postId: string;
}

const MarginTop = styled.div`
  margin-top: 2.5rem;
`;

const PostComments: React.FC<PostCommentsProps> = ({ comments, postId }) => {
  return (
    <PostCommentsTemplate count={comments.length}>
      <PostCommentsWriteContainer postId={postId} />
      <MarginTop>
        <PostCommentsList comments={comments} />
      </MarginTop>
    </PostCommentsTemplate>
  );
};

export default PostComments;
