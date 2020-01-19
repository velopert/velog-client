import React from 'react';
import ReactDOM from 'react-dom';
import './typography.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { ApolloProvider } from '@apollo/react-hooks';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import client from './lib/graphql/client';
import rootReducer from './modules';
import storage from './lib/storage';
import { setUser } from './modules/core';
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://99d0ac3ca0f64b4d8709e385e7692893@sentry.io/1886813',
});

const store = createStore(
  rootReducer,
  (window as any).__REDUX_STATE__,
  composeWithDevTools(),
);

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

(window as any).fbAsyncInit = function() {
  (window as any).FB.init({
    appId: '203040656938507',
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v3.0',
  });
};

// Load facebook SDK
(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0] as any;
  if (d.getElementById(id)) return;
  js = d.createElement(s) as any;
  js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0';
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
