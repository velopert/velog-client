import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

const VelogAboutRightButtonBlock = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  justify-content: flex-end;
`;

export interface VelogAboutRightButtonProps {
  edit: boolean;
  onClick: () => void;
}

const VelogAboutRightButton = ({
  edit,
  onClick,
}: VelogAboutRightButtonProps) => {
  return (
    <VelogAboutRightButtonBlock>
      <Button size="large" onClick={onClick}>
        {edit ? '저장하기' : '수정하기'}
      </Button>
    </VelogAboutRightButtonBlock>
  );
};

export default VelogAboutRightButton;
