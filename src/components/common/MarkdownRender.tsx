import * as React from 'react';
import styled from 'styled-components';
import remark from 'remark';
// import htmlPlugin from 'remark-html';
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
  shouldShowAds?: boolean;
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
  shouldShowAds = false,
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
  const [hasEnoughBlock, setHasEnoughBlock] = useState(false);
  const [htmlWithAds, setHtmlWithAds] = useState('');

  const throttledUpdate = React.useMemo(() => {
    return throttle(delay, (markdown: string) => {
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

  useEffect(() => {
    if (!shouldShowAds || !html) {
      setHtmlWithAds('');
      return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const blockElements = doc.querySelectorAll('p, h1, h2, h3, h4, h5, h6, blockquote, pre, ul, ol, hr, table');

    console.log('Total blocks:', blockElements.length);

    const hasEnough = blockElements.length >= 20;
    setHasEnoughBlock(hasEnough);
    console.log('hasEnoughBlock:', hasEnough);

    if (hasEnough) {
      // Find the position to insert ad
      let targetBlock = null;
      let insertPosition = 19; // 20th block (0-based index)

      // Look for first h1, h2, h3 after 20th block
      for (let i = 20; i < blockElements.length && i < 50; i++) {
        const block = blockElements[i];
        if (block.tagName === 'H1' || block.tagName === 'H2' || block.tagName === 'H3') {
          targetBlock = block;
          insertPosition = i;
          break;
        }
      }

      // If heading found and before index 50, insert before it
      // Otherwise insert after 20th block
      const blockToInsertAfter = targetBlock
        ? blockElements[insertPosition - 1]
        : blockElements[19];

      if (blockToInsertAfter) {
        const adDiv = doc.createElement('ins');
        adDiv.className = 'adsbygoogle';
        adDiv.style.display = 'block';
        adDiv.style.textAlign = 'center';
        adDiv.setAttribute('data-ad-layout', 'in-article');
        adDiv.setAttribute('data-ad-format', 'fluid');
        adDiv.setAttribute('data-ad-client', 'ca-pub-5574866530496701');
        adDiv.setAttribute('data-ad-slot', '9632367492');

        // Insert after the target block (or before heading if found)
        if (targetBlock) {
          targetBlock.parentNode?.insertBefore(adDiv, targetBlock);
        } else {
          blockToInsertAfter.parentNode?.insertBefore(adDiv, blockToInsertAfter.nextSibling);
        }

        // Set the modified HTML
        const updatedHtml = doc.body.innerHTML;
        setHtmlWithAds(updatedHtml);

        // Push ad after 1 second
        setTimeout(() => {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }, 1000);
      } else {
        setHtmlWithAds('');
      }
    } else {
      setHtmlWithAds('');
    }
  }, [html, shouldShowAds]);

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
          dangerouslySetInnerHTML={{ __html: htmlWithAds || html }}
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
