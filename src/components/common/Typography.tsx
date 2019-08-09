import * as React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const TypographyBlock = styled.div`
  font-size: 1.125rem;
  color: ${palette.gray7};
  line-height: 1.85;
  letter-spacing: -0.02em;
  word-break: keep-all;
  word-wrap: break-word;
  p {
    text-align: justify;
  }
  font-family: 'Spoqa Han Sans', -apple-system, BlinkMacSystemFont,
    -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Apple SD Gothic Neo',
    arial, 나눔고딕, 'Nanum Gothic', 돋움;

  a {
    color: ${palette.teal7};
    text-decoration: none;
    &:hover {
      color: ${palette.teal6};
      text-decoration: underline;
    }
  }
  code {
    font-family: 'Fira Mono', source-code-pro, Menlo, Monaco, Consolas,
      'Courier New', monospace;
  }

  hr {
    border: none;
    height: 1px;
    width: 100%;
    background: #dedede;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }

  p {
    img {
      display: block;
      margin: 0 auto;
      max-width: 100%;
      margin-top: 3rem;
      margin-bottom: 3rem;
    }
  }

  h1 {
    font-size: 3rem;
  }
  h2 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.5rem;
  }
  h4 {
    font-size: 1.125rem;
  }

  h1,
  h2,
  h3,
  h4 {
    line-height: 1.35;
    margin-bottom: 1rem;
  }
  p + h1,
  p + h2,
  p + h3,
  p + h4 {
    margin-top: 2.5rem;
  }
`;

export interface TypographyProps {}

const Typography: React.FC<TypographyProps> = ({ children }) => {
  return <TypographyBlock>{children}</TypographyBlock>;
};

export default Typography;
