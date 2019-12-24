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

const statsFile = path.resolve(__dirname, '../build/loadable-stats.json');
const cacheManager = new CacheManager();

const serverRender: Middleware = async (ctx, next) => {
  // enable proxy to backend server in development mode
  if (/^\/(api|graphql)/.test(ctx.path)) {
    return next();
  }

  // prepare redux store
  const store = createStore(rootReducer);
  // prepare apollo client

  const loggedIn = !!(
    ctx.cookies.get('refresh_token') || ctx.cookies.get('access_token')
  );

  if (!loggedIn) {
    const cachedPage = await cacheManager.get(ctx.url);
    if (cachedPage) {
      ctx.body = cachedPage;
      return;
    }
  }

  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'http://localhost:5000/graphql',
      fetch: fetch as any,
      headers: {
        cookie: ctx.headers.cookie,
      },
    }),
    cache: new InMemoryCache(),
  });

  const context = {};
  const sheet = new ServerStyleSheet();
  const extractor = new ChunkExtractor({ statsFile });

  const Root = (
    <ChunkExtractorManager extractor={extractor}>
      <StyleSheetManager sheet={sheet.instance}>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <StaticRouter location={ctx.url} context={context}>
              <App />
            </StaticRouter>
          </ApolloProvider>
        </Provider>
      </StyleSheetManager>
    </ChunkExtractorManager>
  );

  try {
    await getDataFromTree(Root);
  } catch (e) {
    console.log(e);
    ctx.throw(500);
    return;
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
    />
  );

  const pageHtml = `<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(
    html,
  )}`;

  ctx.body = pageHtml;

  setImmediate(() => {
    if (!loggedIn) {
      cacheManager.set(ctx.url, pageHtml);
    }
  });
};

export default serverRender;
