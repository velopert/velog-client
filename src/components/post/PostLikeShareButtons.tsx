import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { getScrollTop } from '../../lib/utils';
import { LikeIcon, ShareIcon } from '../../static/svg';
import { useSpring, animated, config } from 'react-spring';
import useBoolean from '../../lib/hooks/useBoolean';

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

const CircleButton = styled(animated.div)<{ active?: boolean }>`
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
  z-index: 5;
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
  ${props =>
    props.active &&
    css`
      background: ${palette.teal5};
      border-color: ${palette.teal5};
      color: white;
      &:hover {
        background: ${palette.teal4};
        border-color: ${palette.teal4};
        color: white;
      }
    `}
`;

const LikeCount = styled.div`
  margin-top: 0.5rem;
  color: ${palette.gray7};
  line-height: 1;
  font-size: 0.75rem;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const ShareButtons = styled.div`
  position: relative;
  width: 100%;
  .positioner {
    position: absolute;
  }
`;

const ShareButton = styled(animated.div)`
  top: 0;
  left: 0;
  position: absolute;
  width: 48px;
  height: 48px;
`;

export interface PostLikeShareButtonsProps {
  onLikeToggle: () => any;
  likes: number;
  liked: boolean;
}

const PostLikeShareButtons: React.FC<PostLikeShareButtonsProps> = ({
  onLikeToggle,
  likes,
  liked,
}) => {
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

  const [animateLike, setAnimateLike] = useState(false);
  const [prevLiked, setPrevLiked] = useState(liked);
  const [open, toggle] = useBoolean(false);

  console.log(open);

  useEffect(() => {
    setPrevLiked(liked);
    if (!prevLiked && liked) {
      setAnimateLike(true);
    }
  }, [liked, prevLiked]);

  const { x } = useSpring({
    from: { x: 0 },
    x: animateLike ? 1 : 0,
    immediate: !animateLike,
    config: {
      duration: 600,
    },
    onRest: () => setAnimateLike(false),
  });
  const { shareX } = useSpring({
    from: { shareX: 0 },
    shareX: open ? 1 : 0,
    config: config.gentle,
  });

  console.log(shareX);

  return (
    <Wrapper ref={element}>
      <Positioner>
        <PostLikeShareButtonsBlock fixed={fixed}>
          <CircleButton
            data-testid="like"
            onClick={onLikeToggle}
            active={liked}
            style={{
              transform: x
                .interpolate({
                  range: [0, 0.25, 0.5, 0.6, 1],
                  output: [1, 1.25, 1, 1.25, 1],
                })
                .interpolate(x => `scale(${x})`),
            }}
          >
            <LikeIcon />
          </CircleButton>
          <LikeCount>{likes}</LikeCount>
          <ShareButtons>
            <div className="positioner">
              <ShareButton
                style={{
                  opacity: shareX,
                  transform: shareX
                    .interpolate({
                      range: [0, 1],
                      output: [0, 1],
                    })
                    .interpolate(
                      shareX =>
                        `translate(${shareX * 48}px, -${shareX * 52}px)`,
                    ),
                }}
              >
                <CircleButton />
              </ShareButton>
              <ShareButton
                style={{
                  opacity: shareX,
                  transform: shareX
                    .interpolate({
                      range: [0, 1],
                      output: [0, 1],
                    })
                    .interpolate(shareX => `translate(${shareX * 72}px)`),
                }}
              >
                <CircleButton />
              </ShareButton>
              <ShareButton
                style={{
                  opacity: shareX,
                  transform: shareX
                    .interpolate({
                      range: [0, 1],
                      output: [0, 1],
                    })
                    .interpolate(
                      shareX => `translate(${shareX * 48}px, ${shareX * 52}px)`,
                    ),
                }}
              >
                <CircleButton />
              </ShareButton>
            </div>
          </ShareButtons>
          <CircleButton onClick={toggle}>
            <ShareIcon className="share" />
          </CircleButton>
        </PostLikeShareButtonsBlock>
      </Positioner>
    </Wrapper>
  );
};

export default PostLikeShareButtons;
