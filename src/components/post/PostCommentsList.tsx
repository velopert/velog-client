import * as React from 'react';
import styled from 'styled-components';

const PostCommentsListBlock = styled.div``;

export interface PostCommentsListProps {}

const PostCommentsList: React.FC<PostCommentsListProps> = props => {
  return <PostCommentsListBlock />;
};

export default PostCommentsList;
