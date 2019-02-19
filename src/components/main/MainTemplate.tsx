import * as React from 'react';
import styled from 'styled-components';
import PageTemplate from '../base/PageTemplate';

const MainTemplateBlock = styled.div``;

interface MainTemplateProps {}

const MainTemplate: React.SFC<MainTemplateProps> = props => {
  return <PageTemplate />;
};

export default MainTemplate;
