import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { GET_REPLIES, CommentWithReplies } from '../../lib/graphql/post';
import PostReplies from '../../components/post/PostReplies';

export interface PostRepliesProps {
  postId: string;
  commentId: string;
}

const PostRepliesContainer: React.FC<PostRepliesProps> = ({
  postId,
  commentId,
}) => {
  return (
    <Query query={GET_REPLIES} variables={{ id: commentId }}>
      {({
        loading,
        error,
        data,
      }: QueryResult<{ comment: CommentWithReplies }>) => {
        if (loading || !data) return null;
        return <PostReplies comments={data.comment.replies} />;
      }}
    </Query>
  );
};

export default PostRepliesContainer;
