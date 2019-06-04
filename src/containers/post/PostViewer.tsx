import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { READ_POST, SinglePost } from '../../lib/graphql/post';
import PostHead from '../../components/post/PostHead';

export interface PostViewerProps {
  username: string;
  urlSlug: string;
}

const PostViewer: React.FC<PostViewerProps> = ({ username, urlSlug }) => {
  return (
    <Query
      query={READ_POST}
      variables={{
        username,
        url_slug: urlSlug,
      }}
    >
      {({ loading, error, data }: QueryResult<{ post: SinglePost }>) => {
        console.log(error);
        if (loading) return null; // TODO: show placeholder
        if (!data || !data.post) return null;
        if (error) return null; // SHOW ERROR
        const { post } = data;
        return (
          <>
            <PostHead
              title={post.title}
              tags={post.tags}
              username={username}
              date={post.released_at}
            />
          </>
        );
      }}
    </Query>
  );
};

export default PostViewer;
