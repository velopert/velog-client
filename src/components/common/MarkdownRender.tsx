import * as React from 'react';
import styled from 'styled-components';
import remark from 'remark';
import htmlPlugin from 'remark-html';
import prismPlugin from '../../lib/remark/prismPlugin';
import prismThemes from '../../lib/styles/prismThemes';
import palette from '../../lib/styles/palette';
import breaks from 'remark-breaks';

export interface MarkdownRenderProps {
  markdown: string;
  codeTheme?: string;
}

const MarkdownRenderBlock = styled.div`
  font-size: 1.3125rem;
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
  &.duotone-light {
    ${prismThemes['duotone-light']}
  }

  pre {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
    font-size: 1rem;
    padding: 1rem;
    border-radius: 4px;
    line-height: 1.5;
    overflow-x: auto;
  }
`;

const { useState, useEffect } = React;
const MarkdownRender: React.SFC<MarkdownRenderProps> = ({
  markdown,
  codeTheme = 'atom-one-light',
}) => {
  const [html, setHtml] = useState('');
  useEffect(() => {
    remark()
      .use(breaks)
      .use(prismPlugin)
      .use(htmlPlugin)
      .process(markdown, (err: any, file: any) => {
        const html = String(file);
        setHtml(html);
      });
  }, [markdown]);

  const markup = { __html: html };
  return (
    <MarkdownRenderBlock
      dangerouslySetInnerHTML={markup}
      className={codeTheme}
    />
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
