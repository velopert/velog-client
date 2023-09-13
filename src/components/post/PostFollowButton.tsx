import * as React from 'react';
import styled from 'styled-components';
import media from '../../lib/styles/media';
import { buttonColorMap } from '../../lib/styles/palette';

export interface PostFollowButtonProps {}

const FollowButtonBlock = styled.button`
  outline: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 2rem;
  border-radius: 1rem;
  background: ${buttonColorMap['teal'].background};
  color: ${buttonColorMap['teal'].color};
  font-weight: 600;
  &:hover {
    background: ${buttonColorMap['teal'].hoverBackground};
  }

  ${media.medium} {
    font-size: 0.875rem;
    border-radius: 0.75rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    border-radius: 0.75rem;
    height: 24px;
  }
`;

const PostFollowButton: React.FC<PostFollowButtonProps> = () => {
  return <FollowButtonBlock>팔로우</FollowButtonBlock>;
};

export default PostFollowButton;
