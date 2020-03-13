import React from 'react';
import MainTemplate from './MainTemplate';
import MainHeader from './MainHeader';
import FloatingMainHeader from './FloatingHomeHeader';

export type MainPageTemplateProps = {
  children?: React.ReactNode;
};

function MainPageTemplate({ children }: MainPageTemplateProps) {
  return (
    <MainTemplate>
      <MainHeader />
      <FloatingMainHeader />
      {children}
    </MainTemplate>
  );
}

export default MainPageTemplate;
