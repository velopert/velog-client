import * as React from 'react';
import styled from 'styled-components';
import { Comment } from '../../lib/graphql/post';
import PostCommentItem from './PostCommentItem';

const PostCommentsListBlock = styled.div`
  margin-top: 2.5rem;
`;

export interface PostCommentsListProps {
  comments: Comment[];
  onLoadReplies: (id: string) => any;
  onReply: (options: {
    commentId: string;
    postId: string;
    text: string;
  }) => any;
}

const PostCommentsList: React.FC<PostCommentsListProps> = ({ comments }) => {
  return (
    <PostCommentsListBlock>
      {comments.map(comment => (
        <PostCommentItem comment={comment} key={comment.id} />
      ))}
    </PostCommentsListBlock>
  );
};

export default PostCommentsList;
