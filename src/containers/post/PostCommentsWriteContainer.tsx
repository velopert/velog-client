import React, { useState } from 'react';
import PostCommentsWrite from '../../components/post/PostCommentsWrite';
import { WRITE_COMMENT, RELOAD_COMMENTS } from '../../lib/graphql/post';
import { useMutation, useQuery } from 'react-apollo-hooks';

export interface PostCommentsWriteContainerProps {
  postId: string;
  commentId?: string;
}

const PostCommentsWriteContainer: React.FC<PostCommentsWriteContainerProps> = ({
  postId,
}) => {
  const [comment, setComment] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const [writeComment] = useMutation(WRITE_COMMENT);
  const reloadComments = useQuery(RELOAD_COMMENTS, {
    skip: true,
    fetchPolicy: 'network-only',
    variables: {
      id: postId,
    },
  });

  const onWrite = async () => {
    try {
      await writeComment({
        variables: {
          post_id: postId,
          text: comment,
        },
      });
      setComment('');
      await reloadComments.refetch();
      // window.scrollTo({ top: document.body.scrollHeight });
      const comments = document.querySelectorAll('.comment');
      if (comments.length === 0) return;
      const lastComment = comments.item(comments.length - 1);
      lastComment.scrollIntoView();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <PostCommentsWrite
      onChange={onChange}
      comment={comment}
      onWrite={onWrite}
    />
  );
};

export default PostCommentsWriteContainer;
