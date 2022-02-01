import React from 'react';
import VelogResponsive from '../velog/VelogResponsive';
import styled from 'styled-components';
import PageTemplate from '../base/PageTemplate';
import { themedPalette } from '../../lib/styles/themes';
import media from '../../lib/styles/media';

export interface SavesTemplateProps {
  children: React.ReactNode;
}

const StyledVelogResponsive = styled(VelogResponsive)`
  margin-top: 5rem;
  & > h1 {
    line-height: 1.5;
    font-size: 3rem;
    margin-top: 0;
    margin-bottom: 3rem;
    color: ${themedPalette.text1};
  }

  ${media.medium} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  ${media.small} {
    width: 100%;
    margin-top: 2rem;
    & > h1 {
      font-size: 2.5rem;
      margin-bottom: 1.5rem;
    }
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
