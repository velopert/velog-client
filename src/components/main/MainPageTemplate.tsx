import React from 'react';
import MainTemplate from './MainTemplate';
import Header from '../base/Header';
import FloatingHeader from '../base/FloatingHeader';

export type MainPageTemplateProps = {
  children?: React.ReactNode;
};

function MainPageTemplate({ children }: MainPageTemplateProps) {
  return (
    <MainTemplate>
      <Header />
      <FloatingHeader />
      {children}
    </MainTemplate>
  );
}

export default MainPageTemplate;
