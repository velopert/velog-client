import * as React from 'react';
import styled, { css } from 'styled-components';
import palette, { buttonColorMap } from '../../lib/styles/palette';

type ColorType = 'teal' | 'gray' | 'darkgray';

const ButtonBlock = styled.button<{ color: ColorType }>`
  display: inline-flex;
  align-items: center;
  height: 2rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  border: none;
  color: white;
  background: ${props => buttonColorMap[props.color].background};
  color: ${props => buttonColorMap[props.color].color};
  &:hover,
  &:focus {
    background: ${props => buttonColorMap[props.color].hoverBackground};
  }
  border-radius: 4px;
  padding-top: 0;
  padding-bottom: 0;
`;

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  color?: ColorType;
}

const Button: React.SFC<ButtonProps> = ({
  children,
  ref,
  color = 'teal',
  ...rest
}) => {
  const htmlProps = rest as any;
  return (
    <ButtonBlock color={color} {...htmlProps}>
      {children}
    </ButtonBlock>
  );
};

export default Button;
