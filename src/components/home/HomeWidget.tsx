import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

export type HomeWidgetProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

function HomeWidget({ title, children, className }: HomeWidgetProps) {
  return (
    <MainWidgetBlock className={className}>
      <h4>{title}</h4>
      {children}
    </MainWidgetBlock>
  );
}

const MainWidgetBlock = styled.section`
  h4 {
    line-height: 1.5;
    font-size: 0.875rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${palette.gray2};
    margin-top: 0;
    margin-bottom: 1rem;
    font-weight: bold;
  }

  & + & {
    margin-top: 4rem;
  }
`;

export default HomeWidget;
