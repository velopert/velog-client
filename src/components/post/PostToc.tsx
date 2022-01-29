import React, { useEffect, useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import Sticky from '../common/Sticky';
import { usePostViewerState } from './PostViewerProvider';
import { getScrollTop } from '../../lib/utils';
import media, { mediaQuery } from '../../lib/styles/media';

const Wrapper = styled.div`
  position: relative;
  margin-top: 2rem;
  ${mediaQuery(1365)} {
    display: none;
  }
`;
const Positioner = styled.div`
  position: absolute;
  left: 100%;
`;

const PostTocBlock = styled(Sticky)`
  width: 240px;
  margin-left: 5rem;
  ${media.xlarge} {
    margin-left: 3rem;
  }
  border-left: 2px solid ${palette.gray2};
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  color: ${palette.gray6};
  line-height: 1.5;
  font-size: 0.875rem;
  max-height: calc(100vh - 128px);
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    border-radius: 1px;
    width: 2px;
    &:hover {
      width: 16px;
    }
    background: ${palette.gray1};
  }

  &::-webkit-scrollbar-thumb {
    z-index: 100;
    background: ${palette.gray8};
    /* -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75); */
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
  ${(props) =>
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
    const currentHeading = [...headingTops].reverse().find((headingTop) => {
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
          {toc.map((item) => (
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
