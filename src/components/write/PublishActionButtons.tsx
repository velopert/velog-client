import * as React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import media from '../../lib/styles/media';

const PublishActionButtonsBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
  ${media.custom(767)} {
    margin-top: 2rem;
  }
`;

export interface PublishActionButtonsProps {
  onCancel: () => void;
  onPublish: () => void;
  edit: boolean;
  isLoading: boolean;
}

const PublishActionButtons: React.FC<PublishActionButtonsProps> = ({
  onCancel,
  onPublish,
  edit,
  isLoading,
}) => {
  return (
    <PublishActionButtonsBlock>
      <Button
        size="large"
        data-testid="cancelPublish"
        color="transparent"
        onClick={onCancel}
      >
        취소
      </Button>
      <Button
        size="large"
        data-testid="publish"
        onClick={onPublish}
        disabled={isLoading}
      >
        {edit ? '수정하기' : '출간하기'}
      </Button>
    </PublishActionButtonsBlock>
  );
};

export default PublishActionButtons;
