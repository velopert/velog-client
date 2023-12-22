import * as React from 'react';
import styled, { css } from 'styled-components';
import { buttonColorMap } from '../../lib/styles/palette';
import { Route } from 'react-router';
import { themedPalette } from '../../lib/styles/themes';
import VLink from './VLink';

type ButtonSize = 'SMALL' | 'DEFAULT' | 'LARGE';

type RoundButtonBlockProps = {
  inline?: boolean;
  color: string;
  size: ButtonSize;
  border: boolean;
};

const RoundButtonBlock = styled.button<RoundButtonBlockProps>`
  ${(props) =>
    props.inline &&
    css`
      & + & {
        margin-left: 1rem;
      }
    `}

  ${(props) =>
    props.size === 'SMALL' &&
    css`
      height: 1.5rem;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      font-size: 0.875rem;
      border-radius: 0.75rem;
    `};
  ${(props) =>
    props.size === 'DEFAULT' &&
    css`
      height: 2rem;
      padding-left: 1rem;
      padding-right: 1rem;
      font-size: 1rem;
      border-radius: 1rem;
    `};
  ${(props) =>
    props.size === 'LARGE' &&
    css`
      height: 3rem;
      font-size: 1.5rem;
      padding-left: 2rem;
      padding-right: 2rem;
      border-radius: 1.5rem;
    `}

  background: none;
  border: none;
  outline: none;
  font-weight: bold;
  word-break: keep-all;
  background: ${(props) => buttonColorMap[props.color].background};
  color: ${(props) => buttonColorMap[props.color].color};
  &:hover {
    background: ${(props) => buttonColorMap[props.color].hoverBackground};
  }

  ${(props) =>
    props.border &&
    css<RoundButtonBlockProps>`
      background: ${themedPalette.bg_element2};
      border: 1px solid ${(props) => buttonColorMap[props.color].background};
      color: ${(props) => buttonColorMap[props.color].background};
      &:hover {
        background: ${(props) => buttonColorMap[props.color].background};
        color: ${themedPalette.button_text};
      }
    `}

  transition: 0.125s all ease-in;
  &:focus {
    box-shadow: 0px 2px 12px #00000030;
  }
  cursor: pointer;
  &:disabled {
    background: ${themedPalette.bg_element2};
  }
`;

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface RoundButtonProps extends ButtonProps {
  inline?: boolean;
  to?: string;
  size?: ButtonSize;
  color?: 'teal' | 'gray' | 'darkGray' | 'lightGray';
  border?: boolean;
}

const RoundButton: React.FC<RoundButtonProps> = ({
  ref,
  to,
  color = 'teal',
  size = 'DEFAULT',
  border = false,
  children,
  ...rest
}) => {
  if (to) {
    if (to === '/') {
      return (
        <RoundButtonBlock color={color} size={size} border={border} {...rest}>
          <VLink to="/"> {children}</VLink>
        </RoundButtonBlock>
      );
    }
    return (
      <Route
        render={({ history }) => (
          <RoundButtonBlock
            color={color}
            onClick={(e) => {
              e.preventDefault();
              history.push(to);
            }}
            size={size}
            border={border}
            children={children}
            {...rest}
          />
        )}
      />
    );
  }
  return (
    <RoundButtonBlock
      color={color}
      size={size}
      border={border}
      children={children}
      {...rest}
    />
  );
};

export default RoundButton;
