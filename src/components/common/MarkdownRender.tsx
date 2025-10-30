import * as React from 'react';
import styled from 'styled-components';
import remark from 'remark';
// import htmlPlugin from 'remark-html';
import slug from 'remark-slug';
import prismPlugin from '../../lib/remark/prismPlugin';
import prismThemes from '../../lib/styles/prismThemes';
import imgCaptionPlugin from '../../lib/remark/imgCaptionPlugin';
import breaks from 'remark-breaks';
import Typography from './Typography';
import embedPlugin from '../../lib/remark/embedPlugin';
import { loadScript, ssrEnabled } from '../../lib/utils';
import media from '../../lib/styles/media';
import parse from 'html-react-parser';
import { throttle } from 'throttle-debounce';
import sanitize from 'sanitize-html';
import math from 'remark-math';
import remark2rehype from 'remark-rehype';
import katex from 'rehype-katex';
import raw from 'rehype-raw';
import remarkParse from 'remark-parse';
import stringify from 'rehype-stringify';
import { Helmet } from 'react-helmet-async';
import katexWhitelist from '../../lib/katexWhitelist';
import { themedPalette } from '../../lib/styles/themes';

export interface MarkdownRenderProps {
  markdown: string;
  codeTheme?: string;
  onConvertFinish?: (html: string) => any;
  editing?: boolean;
}

function sanitizeEventScript(htmlString: string) {
  return htmlString.replace(/ on\w+="[^"]*"/g, '');
}

const MarkdownRenderBlock = styled.div`
  &.atom-one {
    ${prismThemes['atom-one']}
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
    font-size: 0.875rem;
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
    margin: auto;
  }

  figure {
    margin: 3rem 0 3rem 0;
  }

  figure > figcaption {
    text-align: center;
    line-height: 2;
    font-size: 0.875rem;
    opacity: 0.8;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  iframe {
    width: 768px;
    height: 430px;
    max-width: 100%;
    background: black;
    display: block;
    margin: auto;
    border: none;
    border-radius: 4px;
    overflow: hidden;
  }

  .twitter-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: none;
    background: none;
    padding: none;
  }

  table {
    min-width: 40%;
    max-width: 100%;
    border: 1px solid ${themedPalette.border2};
    border-collapse: collapse;
    font-size: 0.875rem;
    thead > tr > th {
      /* text-align: left; */
      border-bottom: 4px solid ${themedPalette.border2};
    }
    th,
    td {
      word-break: break-word;
      padding: 0.5rem;
    }

    td + td,
    th + th {
      border-left: 1px solid ${themedPalette.border2};
    }

    tr:nth-child(even) {
      background: ${themedPalette.bg_element2};
    }
    tr:nth-child(odd) {
      background: ${themedPalette.bg_page1};
    }
  }

  .katex-mathml {
    display: none;
  }
`;

function filter(html: string) {
  const presanitized = sanitizeEventScript(html);
  return sanitize(presanitized, {
    allowedTags: [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'p',
      'a',
      'ul',
      'ol',
      'nl',
      'li',
      'b',
      'i',
      'strong',
      'em',
      'strike',
      'code',
      'hr',
      'br',
      'div',
      'table',
      'thead',
      'caption',
      'tbody',
      'tr',
      'th',
      'td',
      'pre',
      'iframe',
      'span',
      'img',
      'del',
      'input',
      'figure',
      'figcaption',

      ...katexWhitelist.tags,
    ],
    allowedAttributes: {
      a: ['href', 'name', 'target'],
      img: ['src', 'alt', 'width', 'height'],
      iframe: ['src', 'allow', 'allowfullscreen', 'scrolling', 'class'],
      '*': ['class', 'id', 'aria-hidden'],
      span: ['style'],
      input: ['type'],
      ol: ['start'],
      ...katexWhitelist.attributes,
    },
    allowedStyles: {
      '*': {
        // Match HEX and RGB
        color: [
          /^#(0x)?[0-9a-f]+$/i,
          /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
        ],
        'text-align': [/^left$/, /^right$/, /^center$/],
      },
      span: {
        ...katexWhitelist.styles,
      },
    },
    allowedIframeHostnames: ['www.youtube.com', 'codesandbox.io', 'codepen.io'],
  });
}

const { useState, useEffect } = React;

type RenderedElement =
  | string
  | React.DetailedReactHTMLElement<{}, HTMLElement>
  | Array<React.DetailedReactHTMLElement<{}, HTMLElement>>
  | null;

const MarkdownRender: React.FC<MarkdownRenderProps> = ({
  markdown,
  codeTheme = 'atom-one',
  onConvertFinish,
  editing,
}) => {
  const [html, setHtml] = useState(
    ssrEnabled
      ? filter(
          remark()
            .use(breaks)
            .use(remarkParse)
            .use(slug)
            .use(prismPlugin)
            .use(embedPlugin)
            .use(remark2rehype, { allowDangerousHTML: true })
            .use(raw)
            .use(math)
            .use(katex)
            .use(stringify)
            .processSync(markdown)
            .toString(),
        )
      : '',
  );

  const [element, setElement] = useState<RenderedElement>(null);
  const [hasTagError, setHasTagError] = useState(false);
  const [delay, setDelay] = useState(25);

  const throttledUpdate = React.useMemo(() => {
    return throttle(delay, (markdown: string) => {
      remark()
        .use(breaks)
        .use(remarkParse)
        .use(slug)
        .use(prismPlugin)
        .use(embedPlugin)
        .use(imgCaptionPlugin)
        .use(remark2rehype, { allowDangerousHTML: true })
        .use(raw)
        .use(math)
        .use(katex)
        .use(stringify)
        .process(
          markdown,
          (err: any, file: any) => {
            const lines = markdown.split(/\r\n|\r|\n/).length;
            const nextDelay = Math.max(
              Math.min(Math.floor(lines * 0.5), 1500),
              22,
            );
            if (nextDelay !== delay) {
              setDelay(nextDelay);
            }
            const html = String(file);

            if (onConvertFinish) {
              onConvertFinish(filter(html));
            }
            // load twitter script if needed
            if (html.indexOf('class="twitter-tweet"') !== -1) {
              // if (window && (window as any).twttr) return;
              loadScript('https://platform.twitter.com/widgets.js');
            }

            if (!editing) {
              setHtml(filter(html));
              return;
            }

            try {
              const el = parse(html);
              setHasTagError(false);
              setElement(el);
            } catch (e) {}
          },
          1,
        );
    });
  }, [delay, editing, onConvertFinish]);

  useEffect(() => {
    throttledUpdate(markdown);
  }, [markdown, throttledUpdate]);

  return (
    <Typography>
      <Helmet>
        {/\$(.*)\$/.test(markdown) && (
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"
            integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq"
            crossOrigin="anonymous"
          />
        )}
      </Helmet>
      {editing ? (
        <MarkdownRenderErrorBoundary
          onError={() => setHasTagError(true)}
          hasTagError={hasTagError}
        >
          <MarkdownRenderBlock className={codeTheme}>
            {element}
          </MarkdownRenderBlock>
        </MarkdownRenderErrorBoundary>
      ) : (
        <MarkdownRenderBlock
          className={codeTheme}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </Typography>
  );
};

type ErrorBoundaryProps = {
  onError: () => void;
  hasTagError: boolean;
};
class MarkdownRenderErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = {
    hasError: false,
  };
  componentDidCatch() {
    this.setState({
      hasError: true,
    });
    this.props.onError();
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (prevProps.hasTagError && !this.props.hasTagError) {
      this.setState({
        hasError: false,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return <div>HTML 태그 파싱 실패</div>;
    }
    return this.props.children;
  }
}

export default React.memo(MarkdownRender);
