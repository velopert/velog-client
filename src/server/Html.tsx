import React from 'react';
import { ChunkExtractor } from '@loadable/server';
import { HelmetData } from 'react-helmet';

export type HtmlProps = {
  content: string;
  styledElement: React.ReactNode; // styled-components
  extractor: ChunkExtractor;
  apolloState: any;
  reduxState: any;
  helmet: HelmetData;
  theme: string | null;
};

const favicons = [
  { rel: 'shortcut icon', path: '/favicon.ico' },
  {
    rel: 'apple-touch-icon',
    sizes: '152x152',
    path: '/favicons/apple-icon-152x152.png',
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
  helmet,
  theme,
}: HtmlProps) {
  return (
    <html>
      {/* <head dangerouslySetInnerHTML={{ __html: head }}></head> */}
      <head>
        {helmet.title.toComponent()}
        {helmet.link.toComponent()}
        {helmet.meta.toComponent()}
        {styledElement}
        {extractor.getLinkElements()}
        {extractor.getStyleElements()}
        {favicons.map((favicon) => (
          <link
            key={favicon.path}
            rel={favicon.rel}
            sizes={favicon.sizes}
            href={process.env.PUBLIC_URL.concat(favicon.path)}
          />
        ))}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          data-ad-client="ca-pub-5574866530496701"
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        ></script>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-125599395-1"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'UA-125599395-1');`,
          }}
        ></script>
      </head>
      <body data-theme={theme}>
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
