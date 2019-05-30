import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PostTemplate from '../components/post/PostTemplate';
import PostViewer from '../containers/post/PostViewer';

interface PostPageProps
  extends RouteComponentProps<{
    username: string;
    urlSlug: string;
  }> {}

const PostPage: React.SFC<PostPageProps> = ({ match }) => {
  const { username, urlSlug } = match.params;

  return (
    <PostTemplate>
      <PostViewer username={username} urlSlug={urlSlug} />
    </PostTemplate>
  );
};

export default PostPage;
