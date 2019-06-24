import React from 'react';
import { Query, QueryResult, Mutation } from 'react-apollo';
import {
  GET_REPLIES,
  CommentWithReplies,
  WRITE_COMMENT,
} from '../../lib/graphql/post';
import PostReplies from '../../components/post/PostReplies';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { useQuery, useMutation } from 'react-apollo-hooks';

export interface PostRepliesProps {
  commentId: string;
  onHide: () => void;
}

const PostRepliesContainer: React.FC<PostRepliesProps> = ({
  commentId,
  onHide,
}) => {
  const postId = useSelector((state: RootState) => state.post.id);
  const replies = useQuery<{ comment: CommentWithReplies }>(GET_REPLIES, {
    variables: {
      id: commentId,
    },
  });
  const writeComment = useMutation(WRITE_COMMENT);
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

  if (replies.loading || !replies.data) {
    return null;
  }

  return (
    <PostReplies
      comments={replies.data.comment.replies}
      onReply={onReply}
      onHide={onHide}
    />
  );
};

export default PostRepliesContainer;
