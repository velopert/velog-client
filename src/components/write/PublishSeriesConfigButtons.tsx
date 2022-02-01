import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const PublishSeriesConfigButtonsBlock = styled.div`
  margin-top: 1rem;
  padding-top: 1px;
  display: flex;
  justify-content: flex-end;
`;

export interface PublishSeriesConfigButtonsProps {
  onCancel: () => any;
  onConfirm: () => any;
  disableConfirm: boolean;
}

const PublishSeriesConfigButtons: React.FC<PublishSeriesConfigButtonsProps> = ({
  onCancel,
  onConfirm,
  disableConfirm,
}) => {
  return (
    <PublishSeriesConfigButtonsBlock>
      <Button inline size="large" color="transparent" onClick={onCancel}>
        취소
      </Button>
      <Button inline size="large" onClick={onConfirm} disabled={disableConfirm}>
        선택하기
      </Button>
    </PublishSeriesConfigButtonsBlock>
  );
};

export default PublishSeriesConfigButtons;
