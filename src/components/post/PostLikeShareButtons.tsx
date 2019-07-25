import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { getScrollTop } from '../../lib/utils';
import { LikeIcon, ShareIcon } from '../../static/svg';

const Wrapper = styled.div`
  position: relative;
  margin-top: 2rem;
`;
const Positioner = styled.div`
  position: absolute;
  left: -7rem;
`;
const PostLikeShareButtonsBlock = styled.div<{ fixed: boolean }>`
  width: 4rem;
  background: ${palette.gray0};
  border: 1px solid ${palette.gray1};
  border-radius: 2rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${props =>
    props.fixed &&
    css`
      position: fixed;
      top: 7rem;
    `}
`;

const CircleButton = styled.div`
  height: 3rem;
  width: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid ${palette.gray5};
  border-radius: 1.5rem;
  color: ${palette.gray6};
  cursor: pointer;
  svg {
    width: 24px;
    height: 24px;
    &.share {
      width: 20px;
      height: 20px;
    }
  }
  &:hover {
    color: ${palette.gray9};
    border-color: ${palette.gray9};
  }
`;

const LikeCount = styled.div`
  margin-top: 0.5rem;
  color: ${palette.gray7};
  line-height: 1;
  font-size: 0.75rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

export interface PostLikeShareButtonsProps {}

const PostLikeShareButtons: React.FC<PostLikeShareButtonsProps> = props => {
  const [top, setTop] = useState(0);
  const [fixed, setFixed] = useState(false);
  const element = useRef<HTMLDivElement | null>(null);

  const setup = useCallback(() => {
    if (!element.current) return;
    const pos = element.current.getBoundingClientRect();
    setTop(pos.top + getScrollTop());
  }, []);

  const onScroll = useCallback(() => {
    const scrollTop = getScrollTop();
    console.log({ scrollTop, top });
    const nextFixed = scrollTop + 112 > top;
    if (fixed !== nextFixed) {
      setFixed(nextFixed);
      console.log('switfh~');
    }
  }, [fixed, top]);

  // setup
  useEffect(() => {
    if (!element.current) return;
    setup();
  }, [setup]);

  // register scroll event
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <Wrapper ref={element}>
      <Positioner>
        <PostLikeShareButtonsBlock fixed={fixed}>
          <CircleButton>
            <LikeIcon />
          </CircleButton>
          <LikeCount>0</LikeCount>
          <CircleButton>
            <ShareIcon className="share" />
          </CircleButton>
        </PostLikeShareButtonsBlock>
      </Positioner>
    </Wrapper>
  );
};

export default PostLikeShareButtons;
