import { useApolloClient } from '@apollo/react-hooks';
import { useCallback } from 'react';
import { READ_POST } from '../graphql/post';

/**
 * Returns a function that prefetches post
 */
export default function usePrefetchPost(username: string, urlSlug: string) {
  const client = useApolloClient();
  return useCallback(() => {
    client.query({
      query: READ_POST,
      variables: {
        username,
        url_slug: urlSlug,
      },
    });
  }, [client, username, urlSlug]);
}
