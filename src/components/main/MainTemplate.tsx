import React from 'react';
import styled from 'styled-components';

export type MainTemplateProps = {
  children: React.ReactNode;
};

function MainTemplate({ children }: MainTemplateProps) {
  return (
    <>
      <Block>{children}</Block>
    </>
  );
}

const Block = styled.div``;

export default MainTemplate;
