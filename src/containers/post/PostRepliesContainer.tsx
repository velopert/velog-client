import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { GET_REPLIES, CommentWithReplies } from '../../lib/graphql/post';
import PostReplies from '../../components/post/PostReplies';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';

export interface PostRepliesProps {
  commentId: string;
}

const PostRepliesContainer: React.FC<PostRepliesProps> = ({ commentId }) => {
  const postId = useSelector((state: RootState) => state.post.id);
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
