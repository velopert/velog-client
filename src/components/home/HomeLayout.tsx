import React from 'react';
import styled from 'styled-components';
import { mediaQuery } from '../../lib/styles/media';

export type HomeLayoutProps = {
  main: React.ReactNode;
};

function HomeLayout({ main }: HomeLayoutProps) {
  return (
    <Block>
      <Main>{main}</Main>
    </Block>
  );
}

const Block = styled.div`
  display: flex;
  margin-top: 2rem;
`;
const Main = styled.main`
  flex: 1;
`;

export default HomeLayout;
