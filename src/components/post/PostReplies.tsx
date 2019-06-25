import React from 'react';
import styled from 'styled-components';
import { Comment } from '../../lib/graphql/post';
import PostCommentsList from './PostCommentsList';
import useBoolean from '../../lib/hooks/useBoolean';
import palette from '../../lib/styles/palette';
import PostCommentsWrite from './PostCommentsWrite';
import useInput from '../../lib/hooks/useInput';
import { useUserId } from '../../lib/hooks/useUser';

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
  onReply: (text: string) => any;
  onHide: () => void;
  onRemove: (id: string) => any;
}

const PostReplies: React.FC<PostRepliesProps> = ({
  comments,
  onReply,
  onHide,
  onRemove,
}) => {
  const [writing, onToggle] = useBoolean(false);
  const currentUserId = useUserId();
  const [comment, onChangeComment, onResetComment] = useInput('');
  const hasComments = comments.length > 0;
  const onWrite = () => {
    onReply(comment);
    if (writing) {
      onToggle();
    }
    onResetComment();
  };
  const onCancel = () => {
    if (comments.length > 0) {
      onToggle();
    } else {
      onHide();
    }
  };
  return (
    <PostRepliesBlock>
      {comments.length > 0 && <PullUp />}
      <PostCommentsList
        comments={comments}
        currentUserId={currentUserId}
        onRemove={onRemove}
      />
      {hasComments && <Separator />}
      {writing || !hasComments ? (
        <PostCommentsWrite
          comment={comment}
          onWrite={onWrite}
          onChange={onChangeComment}
          onCancel={onCancel}
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
