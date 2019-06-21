import React from 'react';
import styled from 'styled-components';
import { Comment } from '../../lib/graphql/post';
import PostCommentsList from './PostCommentsList';

const PostRepliesBlock = styled.div`
  border: solid 1px rgba(0, 0, 0, 0.02);
  background-color: rgba(0, 0, 0, 0.015);
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  border-radius: 4px;
  margin-top: 1.3125rem;
`;

export interface PostRepliesProps {
  comments: Comment[];
}

const PostReplies: React.FC<PostRepliesProps> = ({ comments }) => {
  return (
    <PostRepliesBlock>
      <PostCommentsList comments={comments} />
    </PostRepliesBlock>
  );
};

export default PostReplies;
