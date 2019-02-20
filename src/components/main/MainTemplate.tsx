import * as React from 'react';
import styled from 'styled-components';
import PageTemplate from '../base/PageTemplate';

const MainTemplateBlock = styled(PageTemplate)``;

interface MainTemplateProps {}

const MainTemplate: React.SFC<MainTemplateProps> = props => {
  return <MainTemplateBlock />;
};

export default MainTemplate;
