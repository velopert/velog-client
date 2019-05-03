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

export interface PublishActionButtonsProps {}

const PublishActionButtons: React.FC<PublishActionButtonsProps> = props => {
  return (
    <PublishActionButtonsBlock>
      <StyledButton color="gray">취소</StyledButton>
      <StyledButton>출간하기</StyledButton>
    </PublishActionButtonsBlock>
  );
};

export default PublishActionButtons;
