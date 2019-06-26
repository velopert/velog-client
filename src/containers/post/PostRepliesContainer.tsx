import React, { useState, useCallback } from 'react';
import {
  GET_REPLIES,
  CommentWithReplies,
  WRITE_COMMENT,
  REMOVE_COMMENT,
} from '../../lib/graphql/post';
import PostReplies from '../../components/post/PostReplies';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { useQuery, useMutation } from 'react-apollo-hooks';
import useBoolean from '../../lib/hooks/useBoolean';
import PopupOKCancel from '../../components/common/PopupOKCancel';

export interface PostRepliesProps {
  commentId: string;
  onHide: () => void;
}

const PostRepliesContainer: React.FC<PostRepliesProps> = ({
  commentId,
  onHide,
}) => {
  const [askRemove, onToggleAskRemove] = useBoolean(false);
  const [removeId, setRemoveId] = useState('');

  const postId = useSelector((state: RootState) => state.post.id);
  const replies = useQuery<{ comment: CommentWithReplies }>(GET_REPLIES, {
    variables: {
      id: commentId,
    },
  });
  const writeComment = useMutation(WRITE_COMMENT);
  const removeComment = useMutation(REMOVE_COMMENT);

  const onReply = async (text: string) => {
    await writeComment({
      variables: {
        post_id: postId,
        comment_id: commentId,
        text,
      },
    });
    replies.refetch();
  };

  const onConfirmRemove = useCallback(async () => {
    onToggleAskRemove();
    await removeComment({ variables: { id: removeId } });
    replies.refetch();
  }, [onToggleAskRemove, removeComment, removeId, replies]);

  const onRemove = useCallback(
    (id: string) => {
      onToggleAskRemove();
      setRemoveId(id);
    },
    [onToggleAskRemove],
  );

  if (replies.loading || !replies.data) {
    return null;
  }

  return (
    <>
      <PostReplies
        comments={replies.data.comment.replies}
        onReply={onReply}
        onHide={onHide}
        onRemove={onRemove}
      />
      <PopupOKCancel
        visible={askRemove}
        title="답글 삭제"
        onConfirm={onConfirmRemove}
        onCancel={onToggleAskRemove}
      >
        답글을 정말로 삭제하시겠습니까?
      </PopupOKCancel>
    </>
  );
};

export default PostRepliesContainer;
