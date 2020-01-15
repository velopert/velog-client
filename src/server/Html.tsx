import React from 'react';
import { ChunkExtractor } from '@loadable/server';

export type HtmlProps = {
  content: string;
  styledElement: React.ReactNode; // styled-components
  extractor: ChunkExtractor;
  apolloState: any;
  reduxState: any;
};

/*
<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
<link rel="apple-touch-icon" sizes="152x152" href="%PUBLIC_URL%/favicons/apple-icon-152x152.png"/>
<link rel="apple-touch-icon" sizes="180x180" href="%PUBLIC_URL%/favicons/apple-icon-180x180.png"/>
<link rel="icon" type="image/png" sizes="192x192" href="%PUBLIC_URL%/favicons/android-icon-192x192.png"/>
<link rel="icon" type="image/png" sizes="32x32" href="%PUBLIC_URL%/favicons/favicon-32x32.png"/>
<link rel="icon" type="image/png" sizes="96x96" href="%PUBLIC_URL%/favicons/favicon-96x96.png"/>
<link rel="icon" type="image/png" sizes="16x16" href="%PUBLIC_URL%/favicons/favicon-16x16.png"/>
*/

const favicons = [
  { rel: 'shortcut icon', path: '/favicon.ico' },
  {
    rel: 'apple-touch-icon',
    sizes: '152x152',
    path: '/favicons/apple-icon-152x152.png',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    path: '/favicons/apple-icon-180x180.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '192x192',
    path: '/favicons/favicon-192x192.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    path: '/favicons/favicon-32x32.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '96x96',
    path: '/favicons/favicon-96x96.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    path: '/favicons/favicon-16x16.png',
  },
];

function Html({
  content,
  styledElement,
  extractor,
  apolloState,
  reduxState,
}: HtmlProps) {
  return (
    <html>
      {/* <head dangerouslySetInnerHTML={{ __html: head }}></head> */}
      <head>
        {styledElement}
        {extractor.getLinkElements()}
        {extractor.getStyleElements()}
        {favicons.map(favicon => (
          <link
            key={favicon.path}
            rel={favicon.rel}
            sizes={favicon.sizes}
            href={process.env.PUBLIC_URL.concat(favicon.path)}
          />
        ))}
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }}></div>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(
              apolloState,
            ).replace(/</g, '\\u003c')};`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__REDUX_STATE__=${JSON.stringify(
              reduxState,
            ).replace(/</g, '\\u003c')};`,
          }}
        />
        {extractor.getScriptElements()}
      </body>
    </html>
  );
}

export default Html;
