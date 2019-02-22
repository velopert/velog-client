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
import { getMatches } from './pages/getMatches';

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
const render: Middleware = async ctx => {
  const context = {};
  const extractor = new ChunkExtractor({ statsFile: clientStats });

  // const matches = getMatches(ctx.url);

  const jsx = extractor.collectChunks(
    <StaticRouter location={ctx.url} context={context}>
      <App />
    </StaticRouter>,
  );
  // prepares meta tags including styled-components styles
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

app.listen(5000, () => {
  console.log('SSR server listening to http://localhost:5000');
});
