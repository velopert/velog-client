import React from 'react';
import ReactDOMServer from 'react-dom/server';
import CacheManager from './CacheManager';

const cacheManager = new CacheManager();

export default async function sampleRender() {
  const rendered = ReactDOMServer.renderToString(<div>Hello React!</div>);
  return rendered;
}
