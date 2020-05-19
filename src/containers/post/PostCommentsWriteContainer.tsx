import React, { useState, useEffect } from 'react';
import PostCommentsWrite from '../../components/post/PostCommentsWrite';
import { WRITE_COMMENT, RELOAD_COMMENTS } from '../../lib/graphql/post';
import { useMutation, useQuery } from '@apollo/react-hooks';
import useUser from '../../lib/hooks/useUser';
import useRequireLogin from '../../lib/hooks/useRequireLogin';
import storage from '../../lib/storage';

export interface PostCommentsWriteContainerProps {
  postId: string;
  commentId?: string;
}

const PostCommentsWriteContainer: React.FC<PostCommentsWriteContainerProps> = ({
  postId,
}) => {
  const user = useUser();
  const requireLogin = useRequireLogin();

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

  useEffect(() => {
    const key = `comment_before_login:${postId}`;

    const commentBeforeLogin = storage.getItem(
      `comment_before_login:${postId}`,
    );

    if (commentBeforeLogin) {
      setComment(commentBeforeLogin);
      storage.removeItem(key);
    }
  }, [postId]);

  const onWrite = async () => {
    if (!user) {
      storage.setItem(`comment_before_login:${postId}`, comment);
      return requireLogin();
    }
    if (comment === '') return;
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
