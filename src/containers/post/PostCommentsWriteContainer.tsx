import * as React from 'react';
import PostCommentsWrite from '../../components/post/PostCommentsWrite';
export interface PostCommentWriteContainerProps {}

const PostCommentsWriteContainer: React.FC<
  PostCommentWriteContainerProps
> = props => {
  return <PostCommentsWrite />;
};

export default PostCommentsWriteContainer;
