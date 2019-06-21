import * as React from 'react';
import PostCommentsTemplate from '../../components/post/PostCommentsTemplate';
import PostCommentsWriteContainer from './PostCommentsWriteContainer';
import { Comment, WRITE_COMMENT } from '../../lib/graphql/post';
import PostCommentsList from '../../components/post/PostCommentsList';
import { MutationResult, Mutation } from 'react-apollo';

export interface PostCommentsProps {
  comments: Comment[];
  postId: string;
}

const PostComments: React.FC<PostCommentsProps> = ({ comments, postId }) => {
  return (
    <PostCommentsTemplate count={comments.length}>
      <PostCommentsWriteContainer postId={postId} />
      <PostCommentsList comments={comments} />;
    </PostCommentsTemplate>
  );
};

export default PostComments;
