import * as React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const PublishActionButtonsBlock = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export interface PublishActionButtonsProps {
  onCancel: () => void;
  onPublish: () => void;
  edit: boolean;
}

const PublishActionButtons: React.FC<PublishActionButtonsProps> = ({
  onCancel,
  onPublish,
  edit,
}) => {
  return (
    <PublishActionButtonsBlock>
      <Button
        size="large"
        data-testid="cancelPublish"
        color="gray"
        onClick={onCancel}
      >
        취소
      </Button>
      <Button size="large" data-testid="publish" onClick={onPublish}>
        {edit ? '수정하기' : '출간하기'}
      </Button>
    </PublishActionButtonsBlock>
  );
};

export default PublishActionButtons;
