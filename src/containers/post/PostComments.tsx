import * as React from 'react';
import PostCommentsTemplate from '../../components/post/PostCommentsTemplate';
import PostCommentsWriteContainer from './PostCommentsWriteContainer';
import { Comment } from '../../lib/graphql/post';
import PostCommentsList from '../../components/post/PostCommentsList';

export interface PostCommentsProps {
  comments: Comment[];
  postId: string;
}

const PostComments: React.FC<PostCommentsProps> = ({ comments, postId }) => {
  return (
    <PostCommentsTemplate count={comments.length}>
      <PostCommentsWriteContainer postId={postId} />
      <PostCommentsList comments={comments} />
    </PostCommentsTemplate>
  );
};

export default PostComments;
