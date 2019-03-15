import * as React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { Route } from 'react-router';

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
};
const RoundButtonBlock = styled.button<{
  inline?: boolean;
  color: string;
}>`
  ${props =>
    props.inline &&
    css`
      & + & {
        margin-left: 1rem;
      }
    `}

  height: 3rem;
  background: none;
  border: none;
  outline: none;
  font-size: 1.5rem;
  font-weight: bold;
  background: ${props => colorMap[props.color].background};
  color: ${props => colorMap[props.color].color};
  padding-left: 2rem;
  padding-right: 2rem;
  border-radius: 1.5rem;
  &:hover {
    background: ${props => colorMap[props.color].hoverBackground};
  }
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
}

const RoundButton: React.SFC<RoundButtonProps> = ({
  ref,
  to,
  color = 'teal',
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
            {...rest}
          />
        )}
      />
    );
  }
  return <RoundButtonBlock color={color} {...rest} />;
};

export default RoundButton;
