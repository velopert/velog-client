import * as React from 'react';
import styled from 'styled-components';
import { Query, QueryResult } from 'react-apollo';
import { READ_POST, SinglePost } from '../../lib/graphql/post';

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
      {(result: QueryResult<{ post: SinglePost }>) => {
        console.log(result);
        return null;
      }}
    </Query>
  );
};

export default PostViewer;
