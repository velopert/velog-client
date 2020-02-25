import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

const BackgroundStyle = createGlobalStyle`
  body {
    background: ${palette.gray0};
  }
`;

export type HomeTemplateProps = {
  children: React.ReactNode;
};

function HomeTemplate({ children }: HomeTemplateProps) {
  return (
    <>
      <BackgroundStyle />
      <Block>{children}</Block>
    </>
  );
}

const Block = styled.div``;

export default HomeTemplate;
