import React from 'react';
import styled, { css } from 'styled-components';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import { LikeIcon } from '../../static/svg';

export type MobileLikeButtonProps = {
  likes: number;
  onToggle: () => void;
  liked: boolean;
};

function MobileLikeButton({ likes, onToggle, liked }: MobileLikeButtonProps) {
  return (
    <Button onClick={onToggle} data-testid="like-btn" liked={liked}>
      <LikeIcon />
      <span>{likes}</span>
    </Button>
  );
}

const Button = styled.button<{ liked: boolean }>`
  background: ${themedPalette.bg_element1};
  border: 1px solid ${palette.gray5};
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  display: flex;
  align-items: center;
  height: 1.5rem;
  border-radius: 0.75rem;
  outline: none;
  svg {
    width: 0.75rem;
    height: 0.75rem;
    margin-right: 0.75rem;
    color: ${themedPalette.text3};
  }
  span {
    font-size: 0.75rem;
    font-weight: bold;
    color: ${themedPalette.text3};
  }
  ${(props) =>
    props.liked &&
    css`
      border-color: ${palette.teal5};
      background: ${palette.teal5};
      svg,
      span {
        color: white;
      }
    `}
`;

export default MobileLikeButton;
