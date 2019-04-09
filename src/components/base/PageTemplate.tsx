import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import HeaderContainer from '../../containers/base/HeaderContainer';

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
      {!hideHeader && <HeaderContainer />}
      {children}
    </PageTemplateBlock>
  );
};

export default PageTemplate;
