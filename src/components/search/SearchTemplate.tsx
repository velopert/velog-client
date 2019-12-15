import React from 'react';
import PageTemplate from '../base/PageTemplate';
import VelogResponsive from '../velog/VelogResponsive';
import styled from 'styled-components';
import media from '../../lib/styles/media';

const StyledVelogResponsive = styled(VelogResponsive)`
  margin-top: 3.5rem;
  ${media.medium} {
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 2rem;
  }
  ${media.small} {
    margin-top: 0.5rem;
  }
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
