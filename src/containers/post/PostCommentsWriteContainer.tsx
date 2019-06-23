import React, { useState } from 'react';
import PostCommentsWrite from '../../components/post/PostCommentsWrite';
import { Mutation, MutationResult } from 'react-apollo';
import { WRITE_COMMENT, RELOAD_COMMENTS } from '../../lib/graphql/post';

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
  return (
    <Mutation mutation={WRITE_COMMENT}>
      {(
        writeComment,
        { data, loading, error, client }: MutationResult<Comment>,
      ) => {
        const onWrite = async () => {
          try {
            await writeComment({
              variables: {
                post_id: postId,
                text: comment,
              },
            });
            setComment('');
            await client.query({
              query: RELOAD_COMMENTS,
              variables: {
                id: postId,
              },
              fetchPolicy: 'network-only',
            });
            // window.scrollTo({ top: document.body.scrollHeight });
            const comments = document.querySelectorAll('.comment');
            if (comments.length === 0) return;
            const lastComment = comments.item(comments.length - 1);
            lastComment.scrollIntoView();
          } catch (e) {
            console.log(e);
          }
        };
        if (error) {
          console.log(error);
        }
        return (
          <PostCommentsWrite
            onChange={onChange}
            comment={comment}
            onWrite={onWrite}
          />
        );
      }}
    </Mutation>
  );
};

export default PostCommentsWriteContainer;
