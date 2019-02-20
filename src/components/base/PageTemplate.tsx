import * as React from 'react';
import styled from 'styled-components';
import Header from './Header';

const PageTemplateBlock = styled.div``;

interface PageTemplateProps {
  hideHeader?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const PageTemplate: React.SFC<PageTemplateProps> = ({
  hideHeader,
  style,
  className,
  children,
}) => {
  return (
    <PageTemplateBlock style={style} className={className}>
      {!hideHeader && <Header />}
      {children}
    </PageTemplateBlock>
  );
};

export default PageTemplate;
