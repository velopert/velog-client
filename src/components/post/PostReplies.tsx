import React from 'react';
import styled from 'styled-components';
import { Comment } from '../../lib/graphql/post';

const PostRepliesBlock = styled.div``;

export interface PostRepliesProps {
  comments: Comment[];
}

const PostReplies: React.FC<PostRepliesProps> = props => {
  return <PostRepliesBlock />;
};

export default PostReplies;
