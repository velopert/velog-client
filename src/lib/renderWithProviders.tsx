import React from 'react';
import { MockedProvider, MockedResponse } from '@apollo/react-testing';
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

export default function renderWithProviders(
  ui: React.ReactNode,
  { initialState, mocks, routeOptions }: Options = {},
) {
  const store = createStore(rootReducer, initialState);
  const history =
    safe(() => routeOptions!.history) ||
    createMemoryHistory({
      initialEntries: [safe(() => routeOptions!.route) || '/'],
    });

  return {
    ...render(
      <Router history={history}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Provider store={store}>{ui}</Provider>
        </MockedProvider>
      </Router>,
    ),
    store,
  };
}
