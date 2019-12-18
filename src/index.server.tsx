import Koa from 'koa';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const app = new Koa();

app.use(ctx => {
  const html = ReactDOMServer.renderToString(<div>Hello Koa!</div>);
  ctx.body = html;
});

app.listen(3001, () => {
  console.log('SSR server is listening to http://localhost:3001');
});
