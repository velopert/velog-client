import * as React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const PublishActionButtonsBlock = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const StyledButton = styled(Button)`
  height: 2.5rem;
  padding-left: 1.125rem;
  padding-right: 1.125rem;
  & + & {
    margin-left: 0.875rem;
  }
`;

export interface PublishActionButtonsProps {
  onCancel: () => void;
  onPublish: () => void;
}

const PublishActionButtons: React.FC<PublishActionButtonsProps> = ({
  onCancel,
  onPublish,
}) => {
  return (
    <PublishActionButtonsBlock>
      <StyledButton data-testid="cancelPublish" color="gray" onClick={onCancel}>
        취소
      </StyledButton>
      <StyledButton data-testid="publish" onClick={onPublish}>
        출간하기
      </StyledButton>
    </PublishActionButtonsBlock>
  );
};

export default PublishActionButtons;
