import React from 'react';
import styled from 'styled-components';
import { Comment } from '../../lib/graphql/post';
import PostCommentsList from './PostCommentsList';
import useBoolean from '../../lib/hooks/useBoolean';
import palette from '../../lib/styles/palette';
import PostCommentsWrite from './PostCommentsWrite';

const PostRepliesBlock = styled.div`
  border: solid 1px rgba(0, 0, 0, 0.02);
  background-color: rgba(0, 0, 0, 0.015);
  padding: 1.5rem;
  border-radius: 4px;
  margin-top: 1.3125rem;
`;

const PullUp = styled.div`
  margin-top: -1.5rem;
`;

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background: ${palette.gray2};
  margin-bottom: 1.5rem;
`;

const StartWritingButton = styled.button`
  cursor: pointer;
  height: 2.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid ${palette.teal6};
  display: flex;
  outline: none;
  color: ${palette.teal6};
  width: 100%;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  &:hover,
  &:focus {
    background: ${palette.teal6};
    color: white;
  }
`;

export interface PostRepliesProps {
  comments: Comment[];
}

const PostReplies: React.FC<PostRepliesProps> = ({ comments }) => {
  const [writing, onToggle] = useBoolean(false);
  const hasComments = comments.length > 0;
  return (
    <PostRepliesBlock>
      <PullUp />
      <PostCommentsList comments={comments} />
      {hasComments && <Separator />}
      {writing || !hasComments ? (
        <PostCommentsWrite
          comment=""
          onWrite={() => {}}
          onChange={() => {}}
          onCancel={onToggle}
          forReplies
        />
      ) : (
        <StartWritingButton onClick={onToggle}>
          답글 작성하기
        </StartWritingButton>
      )}
    </PostRepliesBlock>
  );
};

export default PostReplies;
