import React, { HTMLProps } from 'react';
import styled, { css } from 'styled-components';
import { themedPalette } from '../../lib/styles/themes';

export type SettingInputProps = {
  fullWidth?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & Omit<HTMLProps<HTMLInputElement>, 'ref' | 'as' | 'onChange'>;

function SettingInput(props: SettingInputProps) {
  return <StyledInput {...props} />;
}

const StyledInput = styled.input<{ fullWidth?: boolean }>`
  display: block;
  border: 1px solid ${themedPalette.border3};
  background: ${themedPalette.bg_element1};
  padding: 0.5rem;
  color: ${themedPalette.text2};
  font-size: 1rem;
  line-height: 1rem;
  outline: none;
  border-radius: 4px;
  &:focus {
    border: 1px solid ${themedPalette.border1};
  }
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
`;

export default SettingInput;
