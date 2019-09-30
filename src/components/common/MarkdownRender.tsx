import * as React from 'react';
import styled from 'styled-components';
import remark from 'remark';
import htmlPlugin from 'remark-html';
import slug from 'remark-slug';
import prismPlugin from '../../lib/remark/prismPlugin';
import prismThemes from '../../lib/styles/prismThemes';
import breaks from 'remark-breaks';
import Typography from './Typography';

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
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const { useState, useEffect } = React;
const MarkdownRender: React.FC<MarkdownRenderProps> = ({
  markdown,
  codeTheme = 'atom-one-light',
  onConvertFinish,
}) => {
  const [html, setHtml] = useState('');
  useEffect(() => {
    remark()
      .use(breaks)
      .use(prismPlugin)
      .use(htmlPlugin)
      .use(slug)
      .process(markdown, (err: any, file: any) => {
        const html = String(file);
        setHtml(html);
        if (onConvertFinish) {
          onConvertFinish(html);
        }
      });
  }, [markdown, onConvertFinish]);

  const markup = { __html: html };
  return (
    <Typography>
      <MarkdownRenderBlock
        dangerouslySetInnerHTML={markup}
        className={codeTheme}
      />
    </Typography>
  );
};

// export default class MarkdownRender extends React.Component<
//   MarkdownRenderProps,
//   any
// > {
//   state = {
//     html: '',
//   };
//   process = () => {
//     remark()
//       .use(prismPlugin)
//       .use(htmlPlugin)
//       .process(this.props.markdown, (err: any, file: any) => {
//         console.log(err);
//         console.log(file);
//         const html = String(file);
//         console.log(html);
//       });
//   };

//   componentDidMount() {
//     this.process();
//   }

//   componentDidUpdate(prevProps: MarkdownRenderProps) {
//     if (prevProps.markdown !== this.props.markdown) {
//       this.process();
//     }
//   }

//   public render() {
//     return <div />;
//   }
// }

export default MarkdownRender;
