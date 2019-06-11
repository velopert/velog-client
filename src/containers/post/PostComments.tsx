import * as React from 'react';
import PostCommentsTemplate from '../../components/post/PostCommentsTemplate';
import PostCommentsWriteContainer from './PostCommentsWriteContainer';

export interface PostCommentsProps {}

const PostComments: React.FC<PostCommentsProps> = props => {
  return (
    <PostCommentsTemplate count={9}>
      <PostCommentsWriteContainer />
    </PostCommentsTemplate>
  );
};

export default PostComments;
