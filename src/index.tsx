import React from 'react';
import ReactDOM from 'react-dom';
import './typography.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { ApolloProvider } from 'react-apollo';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import client from './lib/graphql/client';
import rootReducer from './modules';
import storage from './lib/storage';
import { setUser } from './modules/core';

const store = createStore(rootReducer, composeWithDevTools());

const loadUser = () => {
  const user = storage.getItem('CURRENT_USER');
  if (!user) return;
  store.dispatch(setUser(user));
};

loadUser();

if (process.env.NODE_ENV === 'production') {
  loadableReady(() => {
    ReactDOM.hydrate(
      <Provider store={store}>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ApolloProvider>
      </Provider>,
      document.getElementById('root'),
    );
  });
} else {
  ReactDOM.render(
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>,
    document.getElementById('root'),
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
