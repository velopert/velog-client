import React from 'react';
import styled from 'styled-components';
import PublishSection from './PublishSection';

export interface PublishSeriesConfigTemplateProps {
  buttons: React.ReactNode;
}

const StyledPublishSection = styled(PublishSection)`
  display: flex;
  flex: 1;
  flex-direction: column;
  .contents {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`;

const SeriesBlock = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  flex-direction: column;
  border-radius: 2px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.03);
  overflow: hidden;
`;

const PublishSeriesConfigTemplate: React.FC<
  PublishSeriesConfigTemplateProps
> = ({ children, buttons }) => {
  return (
    <StyledPublishSection title="시리즈 설정">
      <SeriesBlock>{children}</SeriesBlock>
      {buttons}
    </StyledPublishSection>
  );
};

export default PublishSeriesConfigTemplate;
