import React from 'react';
import styled from 'styled-components';
import { Comment } from '../../lib/graphql/post';
import PostCommentsList from './PostCommentsList';

const PostRepliesBlock = styled.div``;

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
