import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

const BackgroundStyle = createGlobalStyle`
  body {
    background: ${palette.gray0};
  }
`;

export type MainTemplateProps = {
  children: React.ReactNode;
};

function MainTemplate({ children }: MainTemplateProps) {
  return (
    <>
      <BackgroundStyle />
      <Block>{children}</Block>
    </>
  );
}

const Block = styled.div``;

export default MainTemplate;
