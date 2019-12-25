import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

const host =
  (process.env.NODE_ENV === 'development'
    ? '/'
    : process.env.REACT_APP_API_HOST) || '/';

const graphqlURI = host.concat('graphql');

const client = new ApolloClient({
  uri: graphqlURI,
  cache: new InMemoryCache().restore((window as any).__APOLLO_STATE__),
});

(window as any).client = client;

export default client;
