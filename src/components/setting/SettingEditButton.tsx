import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

export type SettingEditButtonProps = {
  onClick?: () => void;
};

function SettingEditButton({ onClick }: SettingEditButtonProps) {
  return <StyledButton onClick={onClick}>수정</StyledButton>;
}

const StyledButton = styled.button`
  outline: none;
  padding: 0;
  border: none;
  display: inline;
  font-size: 1rem;
  line-height: 1.5;
  color: ${palette.teal6};
  text-decoration: underline;
  cursor: pointer;
  &:hover,
  &:focus {
    color: ${palette.teal4};
  }
`;

export default SettingEditButton;
