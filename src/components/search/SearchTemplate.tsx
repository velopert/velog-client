import React from 'react';
import PageTemplate from '../base/PageTemplate';
import VelogResponsive from '../velog/VelogResponsive';
import styled from 'styled-components';

const StyledVelogResponsive = styled(VelogResponsive)`
  margin-top: 3.5rem;
`;

export interface SearchTemplateProps {
  children: React.ReactNode;
}

function SearchTemplate({ children }: SearchTemplateProps) {
  return (
    <PageTemplate>
      <StyledVelogResponsive>{children}</StyledVelogResponsive>
    </PageTemplate>
  );
}

export default SearchTemplate;
