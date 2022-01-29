import React from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';

const StyledButton = styled.button`
  display: inline-flex;
  height: 2rem;
  padding-left: 0.5rem;
  padding-right: 0.75rem;
  align-items: center;
  cursor: pointer;
  background: ${themedPalette.bg_element2};
  border-radius: 4px;
  border: none;
  outline: none;
  &:hover {
    background: ${themedPalette.bg_element2};
  }
  &:focus {
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.12);
  }

  svg {
    color: ${palette.teal5};
    font-size: 1.5rem;
    transition: 0.125s all ease-in;
    &.rotate {
      transform: rotate(180deg);
    }
  }
  span {
    margin-left: 0.25rem;
    font-size: 1rem;
    color: ${palette.gray8};
    line-height: 1;
  }
`;

export interface SorterButtonProps {
  value: 1 | -1;
  onToggle: (...args: any) => any;
  texts?: [string, string];
}

const SorterButton: React.FC<SorterButtonProps> = ({
  value,
  onToggle,
  texts = ['오름차순', '내림차순'],
}) => {
  return (
    <StyledButton onClick={onToggle}>
      <MdKeyboardArrowUp
        data-testid="arrow"
        className={value === -1 ? 'rotate' : ''}
      />
      <span>{value === 1 ? texts[0] : texts[1]}</span>
    </StyledButton>
  );
};

export default SorterButton;
