import * as React from 'react';
import styled from 'styled-components';
import remark from 'remark';
import htmlPlugin from 'remark-html';
import slug from 'remark-slug';
import prismPlugin from '../../lib/remark/prismPlugin';
import prismThemes from '../../lib/styles/prismThemes';
import breaks from 'remark-breaks';
import Typography from './Typography';
import embedPlugin from '../../lib/remark/embedPlugin';
import { loadScript, ssrEnabled } from '../../lib/utils';
import media from '../../lib/styles/media';
import parse from 'html-react-parser';
import { throttle } from 'throttle-debounce';

export interface MarkdownRenderProps {
  markdown: string;
  codeTheme?: string;
  onConvertFinish?: (html: string) => any;
}

const MarkdownRenderBlock = styled.div`
  &.atom-one-dark {
    ${prismThemes['atom-one-dark']}
  }
  &.atom-one-light {
    ${prismThemes['atom-one-light']}
  }
  &.github {
    ${prismThemes['github']}
  }
  &.monokai {
    ${prismThemes['monokai']}
  }
  &.dracula {
    ${prismThemes['dracula']}
  }

  pre {
    font-family: 'Fira Mono', source-code-pro, Menlo, Monaco, Consolas,
      'Courier New', monospace;
    font-size: 1rem;
    padding: 1rem;
    border-radius: 4px;
    line-height: 1.5;
    overflow-x: auto;
    letter-spacing: 0px;
    ${media.small} {
      font-size: 0.75rem;
      padding: 0.75rem;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .youtube {
    width: 768px;
    height: 430px;
    max-width: 100%;
    background: black;
    display: block;
    margin: auto;
  }

  .twitter-wrapper {
    display: flex;
    justify-content: center;
    height: 580px;
    align-items: center;
    blockquote {
      border-left: none;
    }
  }
`;

const { useState, useEffect } = React;

type RenderedElement =
  | string
  | React.DetailedReactHTMLElement<{}, HTMLElement>
  | Array<React.DetailedReactHTMLElement<{}, HTMLElement>>
  | null;

const MarkdownRender: React.FC<MarkdownRenderProps> = ({
  markdown,
  codeTheme = 'atom-one-light',
  onConvertFinish,
}) => {
  const initialHtml = ssrEnabled
    ? remark()
        .use(breaks)
        .use(prismPlugin)
        .use(htmlPlugin)
        .use(embedPlugin)
        .use(slug)
        .processSync(markdown)
        .toString()
    : '';

  const [element, setElement] = useState<RenderedElement>(
    ssrEnabled ? parse(initialHtml) : null,
  );

  const applyElement = React.useMemo(() => {
    return throttle(250, (el: any) => {
      setElement(el);
    });
  }, []);

  useEffect(() => {
    remark()
      .use(breaks)
      .use(prismPlugin)
      .use(htmlPlugin)
      .use(embedPlugin)
      .use(slug)
      .process(markdown, (err: any, file: any) => {
        const html = String(file);

        if (onConvertFinish) {
          onConvertFinish(html);
        }
        // load twitter script if needed
        if (html.indexOf('class="twitter-tweet"') !== -1) {
          // if (window && (window as any).twttr) return;
          loadScript('https://platform.twitter.com/widgets.js');
        }
        const el = parse(html);

        applyElement(el);
      });
  }, [applyElement, markdown, onConvertFinish]);

  return (
    <Typography>
      <MarkdownRenderBlock className={codeTheme}>{element}</MarkdownRenderBlock>
    </Typography>
  );
};

export default React.memo(MarkdownRender);
