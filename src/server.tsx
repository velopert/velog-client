import React, { createContext } from 'react';
import ReactDOMServer from 'react-dom/server';
import Koa, { Middleware } from 'koa';
import { StaticRouter } from 'react-router';
import { ChunkExtractor } from '@loadable/server';
import { ServerStyleSheet } from 'styled-components';

import path from 'path';

import App from './App';

const clientStats = path.resolve('./build/loadable-stats.json');
const ssrStats = path.resolve('./dist/loadable-stats.json');

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

const ssr: Middleware = async ctx => {
  const context = {};
  const extractor = new ChunkExtractor({ statsFile: clientStats });
  const jsx = extractor.collectChunks(
    <StaticRouter location={ctx.url} context={context}>
      <App />
    </StaticRouter>,
  );
  const sheet = new ServerStyleSheet();
  const rendered = ReactDOMServer.renderToString(sheet.collectStyles(jsx));
  const scStyles = sheet.getStyleTags();
  const collected = {
    script: extractor.getScriptTags(),
    link: extractor.getLinkTags(),
    style: extractor.getStyleTags() + scStyles,
  };
  const page = createPage(rendered, collected);
  ctx.body = page;
};

app.use(ssr);

app.listen(5000, () => {
  console.log('SSR server listening to http://localhost:5000');
});
