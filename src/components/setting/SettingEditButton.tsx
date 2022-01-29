import React from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';

export type SettingEditButtonProps = {
  onClick?: () => void;
  customText: string;
};

function SettingEditButton({ onClick, customText }: SettingEditButtonProps) {
  return <StyledButton onClick={onClick}>{customText}</StyledButton>;
}

SettingEditButton.defaultProps = {
  customText: '수정',
};

const StyledButton = styled.button`
  outline: none;
  padding: 0;
  border: none;
  display: inline;
  font-size: 1rem;
  line-height: 1.5;
  color: ${palette.teal6};
  text-decoration: underline;
  background: none;
  cursor: pointer;
  &:hover,
  &:focus {
    color: ${palette.teal4};
  }
`;

export default SettingEditButton;
