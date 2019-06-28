import React from 'react';
import useInput from '../../lib/hooks/useInput';
import PostCommentsWrite from '../../components/post/PostCommentsWrite';
import { EDIT_COMMENT } from '../../lib/graphql/post';
import { useMutation } from 'react-apollo-hooks';

export interface PostEditCommentProps {
  id: string;
  defaultText: string;
  onCancel: () => any;
}

const PostEditComment: React.FC<PostEditCommentProps> = ({
  id,
  defaultText,
  onCancel,
}) => {
  const [comment, onChange] = useInput(defaultText);
  const editComment = useMutation(EDIT_COMMENT);

  const onWrite = async () => {
    await editComment({
      variables: {
        id,
        text: comment,
      },
    });
    onCancel();
  };

  return (
    <PostCommentsWrite
      comment={comment}
      onChange={onChange}
      onWrite={onWrite}
      onCancel={onCancel}
      edit
    />
  );
};

export default PostEditComment;
