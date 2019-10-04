import React from 'react';
import VelogResponsive from '../velog/VelogResponsive';
import styled from 'styled-components';
import PageTemplate from '../base/PageTemplate';
import palette from '../../lib/styles/palette';

export interface SavesTemplateProps {
  children: React.ReactNode;
}

const StyledVelogResponsive = styled(VelogResponsive)`
  margin-top: 5rem;
  & > h1 {
    font-size: 3rem;
    margin-top: 0;
    margin-bottom: 3rem;
    color: ${palette.gray8};
  }
`;

function SavesTemplate({ children }: SavesTemplateProps) {
  return (
    <PageTemplate>
      <StyledVelogResponsive>
        <h1>임시 글 목록</h1>
        {children}
      </StyledVelogResponsive>
    </PageTemplate>
  );
}

export default SavesTemplate;
