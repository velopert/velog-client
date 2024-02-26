import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { ApolloProvider } from '@apollo/react-hooks';
import './typography.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import client, { noCdnClient } from './lib/graphql/client';
import rootReducer from './modules';
import storage from './lib/storage';
import { setUser } from './modules/core';
import * as Sentry from '@sentry/browser';
import { HelmetProvider } from 'react-helmet-async';
import darkMode from './modules/darkMode';
import { UncachedApolloProvider } from './lib/graphql/UncachedApolloContext';
import { ssrEnabled } from './lib/utils';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://99d0ac3ca0f64b4d8709e385e7692893@sentry.io/1886813',
  });
}

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

const loadTheme = () => {
  const theme = storage.getItem('theme');
  if (!theme) return;
  if (theme === 'dark') {
    store.dispatch(darkMode.actions.enableDarkMode());
  } else {
    store.dispatch(darkMode.actions.enableLightMode());
  }
  document.body.dataset.theme = theme;
};

const loadTurnstile = () => {
  if (ssrEnabled) return;
  (window as any).onAppReady = function () {
    (window as any).isTurnstileReady = true;
    const event = new CustomEvent('isTurnstileReadyChange');
    window.dispatchEvent(event);
  };
};

loadUser();
loadTheme();
loadTurnstile();

if (process.env.NODE_ENV === 'production') {
  loadableReady(() => {
    ReactDOM.hydrate(
      <HelmetProvider>
        <Provider store={store}>
          <UncachedApolloProvider client={noCdnClient}>
            <ApolloProvider client={client}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ApolloProvider>
          </UncachedApolloProvider>
        </Provider>
      </HelmetProvider>,
      document.getElementById('root'),
    );
  });
} else {
  ReactDOM.render(
    <HelmetProvider>
      <Provider store={store}>
        <UncachedApolloProvider client={noCdnClient}>
          <ApolloProvider client={client}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ApolloProvider>
        </UncachedApolloProvider>
      </Provider>
    </HelmetProvider>,
    document.getElementById('root'),
  );
}

(window as any).fbAsyncInit = function () {
  (window as any).FB.init({
    appId: '203040656938507',
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v3.0',
  });
};

// Load facebook SDK
(function (d, s, id) {
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
