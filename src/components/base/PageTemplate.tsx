import * as React from 'react';
import styled from 'styled-components';
import Header from './Header';
import FloatingHeader from './FloatingHeader';

const PageTemplateBlock = styled.div``;

interface PageTemplateProps {
  hideHeader?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const PageTemplate: React.FC<PageTemplateProps> = ({
  hideHeader,
  style,
  className,
  children,
}) => {
  return (
    <PageTemplateBlock style={style} className={className}>
      {!hideHeader && (
        <>
          <Header />
          <FloatingHeader />
        </>
      )}
      {children}
    </PageTemplateBlock>
  );
};

export default PageTemplate;
