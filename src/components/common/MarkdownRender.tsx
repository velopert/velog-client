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
import sanitize from 'sanitize-html';

export interface MarkdownRenderProps {
  markdown: string;
  codeTheme?: string;
  onConvertFinish?: (html: string) => any;
  editing?: boolean;
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
`;

function filter(html: string) {
  return sanitize(html, {
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
    ],
    allowedAttributes: {
      a: ['href', 'name', 'target'],
      img: ['src'],
      iframe: ['src', 'allow', 'allowfullscreen', 'scrolling', 'class'],
      '*': ['class', 'id'],
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
  codeTheme = 'atom-one-light',
  onConvertFinish,
  editing,
}) => {
  const [html, setHtml] = useState(
    ssrEnabled
      ? filter(
          remark()
            .use(breaks)
            .use(prismPlugin)
            .use(htmlPlugin, {
              sanitize: true,
            })
            .use(embedPlugin)
            .use(slug)
            .processSync(markdown)
            .toString(),
        )
      : '',
  );

  const [element, setElement] = useState<RenderedElement>(null);
  const [hasTagError, setHasTagError] = useState(false);

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

        if (!editing) {
          setHtml(filter(html));
          return;
        }

        try {
          const el = parse(html);
          setHasTagError(false);
          applyElement(el);
        } catch (e) {}
      });
  }, [applyElement, editing, markdown, onConvertFinish]);

  return (
    <Typography>
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
