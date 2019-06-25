import React, { useState, useCallback } from 'react';
import PostCommentsTemplate from '../../components/post/PostCommentsTemplate';
import PostCommentsWriteContainer from './PostCommentsWriteContainer';
import {
  Comment,
  REMOVE_COMMENT,
  RELOAD_COMMENTS,
} from '../../lib/graphql/post';
import PostCommentsList from '../../components/post/PostCommentsList';
import styled from 'styled-components';
import { useUserId } from '../../lib/hooks/useUser';
import { useMutation, useQuery } from 'react-apollo-hooks';
import useBoolean from '../../lib/hooks/useBoolean';
import PopupOKCancel from '../../components/common/PopupOKCancel';

export interface PostCommentsProps {
  comments: Comment[];
  postId: string;
  count: number;
}

const MarginTop = styled.div`
  margin-top: 2.5rem;
`;

const PostComments: React.FC<PostCommentsProps> = ({
  comments,
  postId,
  count,
}) => {
  const [askRemove, onToggleAskRemove] = useBoolean(false);
  const [removeId, setRemoveId] = useState('');

  const currentUserId = useUserId();
  const removeComment = useMutation(REMOVE_COMMENT);
  const reloadComments = useQuery(RELOAD_COMMENTS, {
    variables: {
      id: postId,
    },
    skip: true,
  });

  const onConfirmRemove = useCallback(async () => {
    onToggleAskRemove();
    await removeComment({ variables: { id: removeId } });
    reloadComments.refetch();
  }, [onToggleAskRemove, reloadComments, removeComment, removeId]);

  const onRemove = useCallback(
    (id: string) => {
      onToggleAskRemove();
      setRemoveId(id);
    },
    [onToggleAskRemove],
  );

  return (
    <>
      <PostCommentsTemplate count={count}>
        <PostCommentsWriteContainer postId={postId} />
        <MarginTop>
          <PostCommentsList
            comments={comments}
            currentUserId={currentUserId}
            onRemove={onRemove}
          />
        </MarginTop>
      </PostCommentsTemplate>
      <PopupOKCancel
        visible={askRemove}
        title="댓글 삭제"
        onConfirm={onConfirmRemove}
        onCancel={onToggleAskRemove}
      >
        댓글을 정말로 삭제하시겠습니까?
      </PopupOKCancel>
    </>
  );
};

export default PostComments;
