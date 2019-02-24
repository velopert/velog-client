import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: '/graphql',
});

export default client;
