import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { Route } from 'react-router';

type ButtonSize = 'SMALL' | 'DEFAULT' | 'LARGE';

const colorMap: {
  [color: string]: {
    background: string;
    color: string;
    hoverBackground: string;
  };
} = {
  teal: {
    background: palette.teal6,
    color: 'white',
    hoverBackground: palette.teal5,
  },
  gray: {
    background: palette.gray2,
    color: palette.gray7,
    hoverBackground: palette.gray1,
  },
  darkGray: {
    background: palette.gray8,
    color: 'white',
    hoverBackground: palette.gray6,
  },
};

type RoundButtonBlockProps = {
  inline?: boolean;
  color: string;
  size: ButtonSize;
  border: boolean;
};

const RoundButtonBlock = styled.button<RoundButtonBlockProps>`
  ${props =>
    props.inline &&
    css`
      & + & {
        margin-left: 1rem;
      }
    `}

  ${props =>
    props.size === 'SMALL' &&
    css`
      height: 1.5rem;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      font-size: 0.875rem;
      border-radius: 0.75rem;
    `};
  ${props =>
    props.size === 'DEFAULT' &&
    css`
      height: 2rem;
      padding-left: 1rem;
      padding-right: 1rem;
      font-size: 1rem;
      border-radius: 1rem;
    `};
  ${props =>
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
  background: ${props => colorMap[props.color].background};
  color: ${props => colorMap[props.color].color};
  &:hover {
    background: ${props => colorMap[props.color].hoverBackground};
  }

  ${props =>
    props.border &&
    css<RoundButtonBlockProps>`
      background: transparent;
      border: 1px solid ${props => colorMap[props.color].background};
      color: ${props => colorMap[props.color].background};
      &:hover {
        background: ${props => colorMap[props.color].background};
        color: white;
      }
    `}

  transition: 0.125s all ease-in;
  &:focus {
    box-shadow: 0px 2px 12px #00000030;
  }
  cursor: pointer;
`;

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface RoundButtonProps extends ButtonProps {
  inline?: boolean;
  to?: string;
  size?: ButtonSize;
  color?: 'teal' | 'gray' | 'darkGray';
  border?: boolean;
}

const RoundButton: FC<RoundButtonProps> = ({
  ref,
  to,
  color = 'teal',
  size = 'DEFAULT',
  border = false,
  ...rest
}) => {
  if (to) {
    return (
      <Route
        render={({ history }) => (
          <RoundButtonBlock
            color={color}
            onClick={e => {
              e.preventDefault();
              history.push(to);
            }}
            size={size}
            border={border}
            {...rest}
          />
        )}
      />
    );
  }
  return (
    <RoundButtonBlock color={color} size={size} border={border} {...rest} />
  );
};

export default RoundButton;
