import Koa from 'koa';
import path from 'path';
import serve from 'koa-static';
import serverRender from './server/serverRender';

const app = new Koa();

app.use(serve(path.resolve('./build')));

app.use(serverRender);

app.listen(3001, () => {
  console.log('SSR server is listening to http://localhost:3001');
});
