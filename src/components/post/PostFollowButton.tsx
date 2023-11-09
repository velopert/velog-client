import * as React from 'react';
import styled, { css } from 'styled-components';
import media from '../../lib/styles/media';
import { buttonColorMap } from '../../lib/styles/palette';

export interface PostFollowButtonProps {
  followed: boolean;
  onToggle: () => void;
}

const PostFollowButton: React.FC<PostFollowButtonProps> = ({
  onToggle,
  followed,
}) => {
  return (
    <FollowButtonBlock
      onClick={onToggle}
      data-testid="follow-btn"
      followed={followed}
    >
      {followed ? '팔로잉' : '팔로우'}
    </FollowButtonBlock>
  );
};

const FollowButtonBlock = styled.button<{ followed: boolean }>`
  outline: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 2rem;
  border-radius: 1rem;
  word-break: keep-all;

  ${(props) =>
    !props.followed &&
    css`
      background: ${buttonColorMap['teal'].background};
      color: ${buttonColorMap['teal'].color};
      &:hover {
        background: ${buttonColorMap['teal'].hoverBackground};
      }
    `}

  ${(props) =>
    props.followed &&
    css`
      background: ${buttonColorMap['lightGray'].background};
      color: ${buttonColorMap['lightGray'].color};
      &:hover {
        background: ${buttonColorMap['lightGray'].hoverBackground};
      }
    `}

  font-weight: 600;

  ${media.medium} {
    font-size: 0.875rem;
    border-radius: 0.75rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    border-radius: 0.75rem;
    height: 24px;
  }
`;
export default PostFollowButton;
