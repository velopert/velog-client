import * as React from 'react';
import styled from 'styled-components';
import PageTemplate from '../base/PageTemplate';

const VelogPageTemplateBlock = styled(PageTemplate)`
  padding-bottom: 4rem;
`;

export interface VelogPageTemplateProps {}

const VelogPageTemplate: React.FC<VelogPageTemplateProps> = ({ children }) => {
  return <VelogPageTemplateBlock>{children}</VelogPageTemplateBlock>;
};

export default VelogPageTemplate;
