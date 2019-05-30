import * as React from 'react';
import styled from 'styled-components';
import PageTemplate from '../base/PageTemplate';

const VelogPageTemplateBlock = styled(PageTemplate)``;

export interface VelogPageTemplateProps {}

const VelogPageTemplate: React.FC<VelogPageTemplateProps> = props => {
  return <VelogPageTemplateBlock />;
};

export default VelogPageTemplate;
