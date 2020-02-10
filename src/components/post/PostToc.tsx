import React, { useEffect, useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import Sticky from '../common/Sticky';
import { usePostViewerState } from './PostViewerProvider';
import { getScrollTop } from '../../lib/utils';
import media from '../../lib/styles/media';

const Wrapper = styled.div`
  position: relative;
  margin-top: 2rem;
  ${media.xlarge} {
    display: none;
  }
`;
const Positioner = styled.div`
  position: absolute;
  left: 100%;
`;

const PostTocBlock = styled(Sticky)`
  overflow-x: hidden;
  overflow-y: auto;
  bottom: 0;
  width: 240px;
  margin-left: 5rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  color: ${palette.gray6};
  line-height: 1.5;
  font-size: 0.875rem;

  > div {
    padding-left: 0.75rem;
    border-left: 2px solid ${palette.gray2};
  }
`;

const TocItem = styled.div<{ active: boolean }>`
  display: block;
  transition: 0.125s all ease-in;
  a {
    &:hover {
      color: ${palette.gray9};
    }
    text-decoration: none;
    color: inherit;
  }
  ${props =>
    props.active &&
    css`
      color: ${palette.gray9};
      transform: scale(1.05);
    `}
  & + & {
    margin-top: 4px;
  }
`;

export interface PostTocProps {}

const PostToc: React.FC<PostTocProps> = () => {
  const { toc } = usePostViewerState();
  const [activeId, setActiveId] = useState<null | string>(null);
  const [headingTops, setHeadingTops] = useState<
    | null
    | {
        id: string;
        top: number;
      }[]
  >(null);

  const updateTocPositions = useCallback(() => {
    if (!toc) return;
    const scrollTop = getScrollTop();
    const headingTops = toc.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) {
        return {
          id,
          top: 0,
        };
      }
      const top = el.getBoundingClientRect().top + scrollTop;
      return {
        id,
        top,
      };
    });
    setHeadingTops(headingTops);
  }, [toc]);

  useEffect(() => {
    updateTocPositions();
    let prevScrollHeight = document.body.scrollHeight;
    let timeoutId: number | null = null;
    function checkScrollHeight() {
      const scrollHeight = document.body.scrollHeight;
      if (prevScrollHeight !== scrollHeight) {
        updateTocPositions();
      }
      prevScrollHeight = scrollHeight;
      timeoutId = setTimeout(checkScrollHeight, 250);
    }
    timeoutId = setTimeout(checkScrollHeight, 250);
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [updateTocPositions]);

  const onScroll = useCallback(() => {
    const scrollTop = getScrollTop();
    if (!headingTops) return;
    const currentHeading = [...headingTops].reverse().find(headingTop => {
      return scrollTop >= headingTop.top - 4;
    });
    if (!currentHeading) {
      setActiveId(null);
      return;
    }

    setActiveId(currentHeading.id);
  }, [headingTops]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  // For post SSR
  useEffect(() => {
    onScroll();
  }, [onScroll]);

  if (!toc || !headingTops) return null;

  return (
    <Wrapper>
      <Positioner>
        <PostTocBlock top={112}>
          {toc.map(item => (
            <TocItem
              key={item.id}
              style={{ marginLeft: item.level * 12 }}
              active={activeId === item.id}
            >
              <a href={`#${item.id}`}>{item.text}</a>
            </TocItem>
          ))}
        </PostTocBlock>
      </Positioner>
    </Wrapper>
  );
};

export default PostToc;
