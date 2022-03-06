import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

const host =
  (process.env.NODE_ENV === 'development'
    ? '/'
    : process.env.REACT_APP_GRAPHQL_HOST) || '/';

const noCdnHost =
  (process.env.NODE_ENV === 'development'
    ? '/'
    : process.env.REACT_APP_GRAPHQL_HOST_NOCDN) || '/';

const cache = new InMemoryCache().restore((window as any).__APOLLO_STATE__);

const graphqlURI = host.concat('graphql');
const noCdnGraphqlURI = noCdnHost.concat('graphql');

const link = createHttpLink({
  uri: graphqlURI,
  credentials: 'include',
});

const noCdnLink = createHttpLink({
  uri: noCdnGraphqlURI,
  credentials: 'include',
});

const client = new ApolloClient({
  link,
  cache,
});

export const noCdnClient = new ApolloClient({
  link: noCdnLink,
  cache,
});

(window as any).client = client;

export default client;
