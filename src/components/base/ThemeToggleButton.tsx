import React, { useState } from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../lib/styles/themes';
import { MoonIcon } from '../../static/svg';

interface Props {}

function ThemeToggleButton(props: Props) {
  const [theme, setTheme] = useState('light');

  return (
    <IconButton>
      <MoonIcon />
    </IconButton>
  );
}

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.75rem;
  color: white;

  &:hover {
    background: ${themedPalette.slight_layer};
  }
`;

export default ThemeToggleButton;
