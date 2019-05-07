import * as React from 'react';
import PostCardList from '../../components/common/PostCardList';
import { GET_POST_LIST, PartialPost } from '../../lib/graphql/post';
import { QueryResult, Query } from 'react-apollo';
import ScrollingPagination from '../../components/common/ScrollingPagination';

interface RecentPostsProps {}

const { useState } = React;
const RecentPosts: React.SFC<RecentPostsProps> = props => {
  const [loadingMore, setLoadingMore] = useState(false);
  return (
    <Query query={GET_POST_LIST}>
      {({
        loading,
        error,
        data,
        fetchMore,
        client,
      }: QueryResult<{ posts: PartialPost[] }>) => {
        if (error || !data || !data.posts) return null;
        return (
          <>
            <PostCardList posts={data.posts} />
            <ScrollingPagination
              loading={loadingMore}
              lastCursor={data.posts[data.posts.length - 1].id}
              onLoadMore={async cursor => {
                try {
                  const result = await client.query<{ posts: PartialPost[] }>({
                    query: GET_POST_LIST,
                    variables: { cursor },
                  });
                  client.writeQuery({
                    query: GET_POST_LIST,
                    data: {
                      posts: [...data.posts, ...result.data.posts],
                    },
                  });
                } catch (e) {
                  console.log(e);
                }
                setLoadingMore(false);
              }}
              onPrefetch={cursor => {
                client.query({
                  query: GET_POST_LIST,
                  variables: { cursor },
                });
              }}
            />
          </>
        );
      }}
    </Query>
  );
};

export default RecentPosts;
