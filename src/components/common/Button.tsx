import * as React from 'react';
import styled, { css } from 'styled-components';
import { buttonColorMap } from '../../lib/styles/palette';

type ColorType = 'teal' | 'gray' | 'darkGray' | 'lightGray';

const ButtonBlock = styled.button<{ color: ColorType; inline: boolean }>`
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
  ${props =>
    props.inline &&
    css`
      & + & {
        margin-left: 0.5rem;
      }
    `}
`;

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  color?: ColorType;
  inline?: boolean;
}

const Button: React.SFC<ButtonProps> = ({
  children,
  ref,
  color = 'teal',
  inline,
  ...rest
}) => {
  const htmlProps = rest as any;
  return (
    <ButtonBlock
      color={color}
      inline={inline}
      {...htmlProps}
      onClick={e => {
        if (htmlProps.onClick) {
          htmlProps.onClick(e);
        }
        (e.target as HTMLButtonElement).blur();
      }}
    >
      {children}
    </ButtonBlock>
  );
};

export default Button;
