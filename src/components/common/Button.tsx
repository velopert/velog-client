import * as React from 'react';
import styled, { css } from 'styled-components';
import palette, { buttonColorMap } from '../../lib/styles/palette';

type ColorType =
  | 'teal'
  | 'gray'
  | 'darkGray'
  | 'lightGray'
  | 'transparent'
  | 'red';
type ButtonSize = 'medium' | 'large';

const ButtonBlock = styled.button<{
  color: ColorType;
  inline: boolean;
  size: ButtonSize;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
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

  ${props =>
    props.size === 'medium' &&
    css`
      height: 2rem;
      padding-left: 1.25rem;
      padding-right: 1.25rem;
      font-size: 1rem;
    `}

    ${props =>
      props.size === 'large' &&
      css`
        height: 2.5rem;
        padding-left: 1.125rem;
        padding-right: 1.125rem;
        & + & {
          margin-left: 0.875rem;
        }
        font-size: 1.125rem;
      `}

    &:disabled {
      cursor: not-allowed;
      background: ${palette.gray3};
      color: ${palette.gray5};
      &:hover {
        background: ${palette.gray3};
        color: ${palette.gray5};
      }
    }
`;

interface ButtonProps extends Omit<React.HTMLProps<HTMLButtonElement>, 'size'> {
  color?: ColorType;
  inline?: boolean;
  size?: ButtonSize;
}

const Button: React.FC<ButtonProps> = ({
  children,
  ref,
  color = 'teal',
  inline,
  size = 'medium',
  ...rest
}) => {
  const htmlProps = rest as any;
  return (
    <ButtonBlock
      color={color}
      inline={inline}
      size={size}
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
