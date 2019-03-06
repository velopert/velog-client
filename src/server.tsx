import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Koa, { Middleware } from 'koa';
import { StaticRouter } from 'react-router';
import { ChunkExtractor } from '@loadable/server';
import { ServerStyleSheet } from 'styled-components';
import serve from 'koa-static';
import Router from 'koa-router';
import path from 'path';
import App from './App';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { getMatches } from './pages/getMatches';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-fetch';
import { InMemoryCache } from 'apollo-cache-inmemory';
import proxy from 'koa-better-http-proxy';

const clientStats = path.resolve('./build/loadable-stats.json');

function createPage(
  html: string,
  collected: { script: string; link: string; style: string },
) {
  return `<!doctype html>
  <html lang="en">
  
  <head>
    <meta charset="utf-8" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no" />
    <meta name="theme-color" content="#000000" />
    <link rel="manifest" href="/manifest.json" />
    <title>React App</title>
    ${collected.link}
    ${collected.style}
  </head>
  
  <body><noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root">${html}</div>
    ${collected.script}
  </body>
  
  </html>`;
}

const app = new Koa();

/**
 * Process server rendering
 */
const render: Middleware = async (ctx, next) => {
  // use proxy for graphql
  if (ctx.path === '/graphql') {
    return next();
  }
  const context = {};
  const extractor = new ChunkExtractor({ statsFile: clientStats });

  // const matches = getMatches(ctx.url);

  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'http://localhost:5000/graphql',
      fetch,
    }),
    cache: new InMemoryCache(),
  });

  const Root = (
    <ApolloProvider client={client}>
      <StaticRouter location={ctx.url} context={context}>
        <App />
      </StaticRouter>
    </ApolloProvider>
  );
  const jsx = extractor.collectChunks(Root);

  try {
    await getDataFromTree(jsx);
  } catch (e) {
    console.log(e);
  }

  const initialState = client.extract();
  const apolloStateScript = `<script>window.__APOLLO_STATE__ = ${JSON.stringify(
    initialState,
  ).replace(/</g, '\\u003c')}</script>`;
  // prepares meta tags including styled-components styles
  const sheet = new ServerStyleSheet();
  const rendered = ReactDOMServer.renderToString(sheet.collectStyles(jsx));
  const scStyles = sheet.getStyleTags();
  const collected = {
    script: apolloStateScript + extractor.getScriptTags(),
    link: extractor.getLinkTags(),
    style: extractor.getStyleTags() + scStyles,
  };
  const page = createPage(rendered, collected);
  ctx.body = page;
};

const router = new Router();

router.get('/', render); // ignores index.html

app.use(router.routes()).use(router.allowedMethods());

app.use(serve(path.resolve('./build'))); // serves static files

// fallback
app.use((ctx, next) => {
  if (ctx.status !== 404) {
    return;
  }
  return next();
});
app.use(render);
app.use(proxy('localhost', { port: 5000 }));

app.listen(5001, () => {
  console.log('SSR server listening to http://localhost:5001');
});
