import React from 'react';
import styled from 'styled-components';
import media from '../../lib/styles/media';
import palette from '../../lib/styles/palette';

export type SideAreaProps = {
  children: React.ReactNode;
};

function SideArea({ children }: SideAreaProps) {
  return (
    <Wrapper>
      <Block>{children}</Block>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

const Block = styled.div`
  position: absolute;

  width: 11.5rem;
  left: -13.5rem;

  ${media.large} {
    display: none;
  }
`;

export default SideArea;
