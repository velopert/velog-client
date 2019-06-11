import * as React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const TypographyBlock = styled.div`
  font-size: 1.125rem;
  color: ${palette.gray7};
  line-height: 1.75;
  letter-spacing: -0.02em;
  word-break: keep-all;
  word-wrap: break-word;
  font-family: 'Spoqa Han Sans';

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
`;

export interface TypographyProps {}

const Typography: React.FC<TypographyProps> = ({ children }) => {
  return <TypographyBlock>{children}</TypographyBlock>;
};

export default Typography;
