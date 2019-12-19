import React from 'react';
import { ChunkExtractor } from '@loadable/server';

export type HtmlProps = {
  content: string;
  styledElement: React.ReactNode; // styled-components
  extractor: ChunkExtractor;
  apolloState: any;
  reduxState: any;
};

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
        {extractor.getLinkElements}
        {extractor.getStyleElements}
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
        {extractor.getScriptElements}
      </body>
    </html>
  );
}

export default Html;
