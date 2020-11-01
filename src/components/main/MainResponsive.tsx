import React from 'react';
import styled from 'styled-components';
import { mediaQuery } from '../../lib/styles/media';

export type MainResponsiveProps = {
  className?: string;
  children: React.ReactNode;
};

function MainResponsive({ className, children }: MainResponsiveProps) {
  return <Block className={className}>{children}</Block>;
}

const Block = styled.div`
  width: 1728px;
  margin-left: auto;
  margin-right: auto;
  ${mediaQuery(1919)} {
    width: 1376px;
  }
  ${mediaQuery(1440)} {
    width: 1024px;
  }
  ${mediaQuery(1056)} {
    width: calc(100% - 2rem);
  }
`;

export default MainResponsive;
