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
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

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
        <ApolloHooksProvider client={client}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ApolloHooksProvider>
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
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
