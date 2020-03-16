import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { MdArrowBack } from 'react-icons/md';

export type WriteBackButtonProps = {
  onClick: () => void;
};

function WriteBackButton({ onClick }: WriteBackButtonProps) {
  return (
    <StyledButton onClick={onClick} data-testid="goback">
      <Circle>
        <MdArrowBack />
      </Circle>
      <span>뒤로가기</span>
    </StyledButton>
  );
}

const Circle = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 1px solid ${palette.gray6};
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const StyledButton = styled.button`
  border: none;
  height: 2.5rem;
  display: flex;
  align-items: center;
  background: transparent;
  outline: none;
  color: ${palette.gray6};
  cursor: pointer;

  span {
    font-size: 1rem;
    font-weight: bold;
  }

  &:hover {
    color: ${palette.gray8};
    ${Circle} {
      border: 1px solid ${palette.gray8};
    }
  }
`;

export default WriteBackButton;
