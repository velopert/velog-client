import path from 'path';
import React from 'react';
import fetch from 'node-fetch';
import ReactDOMServer from 'react-dom/server';
import { ApolloProvider } from '@apollo/react-common';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-boost';
import { getDataFromTree } from '@apollo/react-ssr';
import { Middleware } from 'koa';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import rootReducer from '../modules';
import App from '../App';
import Html from './Html';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import CacheManager from './CacheManager';
import { HelmetProvider, FilledContext } from 'react-helmet-async';

const statsFile = path.resolve(__dirname, '../build/loadable-stats.json');
const cacheManager = new CacheManager();

type SSROption = {
  url: string;
  loggedIn: boolean;
  cookie: string;
};

const serverRender = async ({ url, loggedIn, cookie }: SSROption) => {
  // enable proxy to backend server in development mode
  if (/^\/(api|graphql)/.test(url)) {
    return null;
  }

  // prepare redux store
  const store = createStore(rootReducer);
  // prepare apollo client

  if (!loggedIn) {
    const cachedPage = await cacheManager.get(url);
    if (cachedPage) {
      return {
        html: cachedPage,
        statusCode: 200,
      };
    }
  }

  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: `${process.env.REACT_APP_API_HOST}graphql`,
      fetch: fetch as any,
      headers: {
        cookie,
      },
    }),
    cache: new InMemoryCache(),
  });

  const context = {
    statusCode: 200,
  };
  const sheet = new ServerStyleSheet();
  const extractor = new ChunkExtractor({
    statsFile,
    publicPath: process.env.PUBLIC_URL,
  });

  const helmetContext = {} as FilledContext;

  console.log('URL: ', url);

  const Root = (
    <ChunkExtractorManager extractor={extractor}>
      <HelmetProvider context={helmetContext}>
        <StyleSheetManager sheet={sheet.instance}>
          <Provider store={store}>
            <ApolloProvider client={client}>
              <StaticRouter location={url} context={context}>
                <App />
              </StaticRouter>
            </ApolloProvider>
          </Provider>
        </StyleSheetManager>
      </HelmetProvider>
    </ChunkExtractorManager>
  );

  try {
    await getDataFromTree(Root);
  } catch (e) {
    console.log('Apollo Error! Rendering result anyways');
    console.log(e);
  }

  const content = ReactDOMServer.renderToString(Root);
  const initialState = client.extract();
  const styledElement = sheet.getStyleElement();

  const html = (
    <Html
      content={content}
      apolloState={initialState}
      reduxState={store.getState()}
      styledElement={styledElement}
      extractor={extractor}
      helmet={helmetContext.helmet}
    />
  );

  const pageHtml = `<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(
    html,
  )}`;

  setImmediate(() => {
    if (!loggedIn) {
      cacheManager.set(url, pageHtml);
    }
  });

  return { html: pageHtml, statusCode: context.statusCode };
};

export default serverRender;
