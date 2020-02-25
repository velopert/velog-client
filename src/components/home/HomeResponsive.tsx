import React from 'react';
import styled from 'styled-components';

export type HomeResponsiveProps = {
  className?: string;
  children: React.ReactNode;
};

function HomeResponsive({ className, children }: HomeResponsiveProps) {
  return <Block className={className}>{children}</Block>;
}

const Block = styled.div`
  width: 1728px;
  margin-left: auto;
  margin-right: auto;
`;

export default HomeResponsive;
