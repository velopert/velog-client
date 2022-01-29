import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { themedPalette } from '../../lib/styles/themes';

const BackgroundStyle = createGlobalStyle`
  body {
    background: ${themedPalette.bg_page1};
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
