import React from 'react';
import { MockedResponse, MockLink } from 'apollo-link-mock';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo-hooks';
import { InMemoryCache } from 'apollo-boost';
import { render } from 'react-testing-library';

export function createClient(mocks: MockedResponse[]) {
  return new ApolloClient({
    cache: new InMemoryCache({ addTypename: false }),
    link: new MockLink(mocks),
  });
}

export default function renderWithApollo(
  ui: React.ReactNode,
  mocks: MockedResponse[],
) {
  const client = createClient(mocks);
  const utils = render(<ApolloProvider client={client}>{ui}</ApolloProvider>);
  return {
    ...utils,
    client,
  };
}
