import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import PostViewer from '../../containers/post/PostViewer';

export interface PostPageProps
  extends RouteComponentProps<{
    username: string;
    urlSlug: string;
  }> {}

const PostPage: React.FC<PostPageProps> = ({ match }) => {
  const { username, urlSlug } = match.params;
  return <PostViewer username={username} urlSlug={urlSlug} />;
};

export default PostPage;
