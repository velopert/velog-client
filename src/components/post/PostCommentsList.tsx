import * as React from 'react';
import styled from 'styled-components';
import { Comment } from '../../lib/graphql/post';
import PostCommentItem from './PostCommentItem';

const PostCommentsListBlock = styled.div``;

export interface PostCommentsListProps {
  comments: Comment[];
  currentUserId: null | string;
}

const PostCommentsList: React.FC<PostCommentsListProps> = ({
  comments,
  currentUserId,
}) => {
  return (
    <PostCommentsListBlock>
      {comments.map(comment => (
        <PostCommentItem
          comment={comment}
          key={comment.id}
          ownComment={currentUserId === comment.user.id}
        />
      ))}
    </PostCommentsListBlock>
  );
};

export default PostCommentsList;
