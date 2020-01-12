import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

const host =
  (process.env.NODE_ENV === 'development'
    ? '/'
    : process.env.REACT_APP_API_HOST) || '/';

const graphqlURI = host.concat('graphql');
const link = createHttpLink({
  uri: graphqlURI,
  credentials: 'include',
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache().restore((window as any).__APOLLO_STATE__),
});

(window as any).client = client;

export default client;
