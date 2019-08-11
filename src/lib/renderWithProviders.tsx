import React from 'react';
import { MockedResponse, MockLink } from 'apollo-link-mock';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo-hooks';
import { InMemoryCache } from 'apollo-boost';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer, { RootState } from '../modules';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { safe } from './utils';

type Options = {
  initialState?: RootState;
  mocks?: MockedResponse[];
  routeOptions?: {
    route: string;
    history?: MemoryHistory;
  };
};

export function createClient(mocks: MockedResponse[]) {
  return new ApolloClient({
    cache: new InMemoryCache({ addTypename: false }),
    link: new MockLink(mocks),
  });
}

export default function renderWithProviders(
  ui: React.ReactNode,
  { initialState, mocks, routeOptions }: Options = {},
) {
  const store = createStore(rootReducer, initialState);
  const client = createClient(mocks || []);
  const history =
    safe(() => routeOptions!.history) ||
    createMemoryHistory({
      initialEntries: [safe(() => routeOptions!.route) || '/'],
    });

  return {
    ...render(
      <Router history={history}>
        <ApolloProvider client={client}>
          <Provider store={store}>{ui}</Provider>
        </ApolloProvider>
      </Router>,
    ),
    store,
    client,
  };
}
