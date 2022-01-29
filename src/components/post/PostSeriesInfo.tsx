import React, { useMemo, useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { SeriesImage } from '../../static/svg';
import {
  MdArrowDropDown,
  MdArrowDropUp,
  MdChevronLeft,
  MdChevronRight,
} from 'react-icons/md';
import useBoolean from '../../lib/hooks/useBoolean';
import {
  NavLink,
  withRouter,
  RouteComponentProps,
  Link,
} from 'react-router-dom';
import {
  usePostViewerState,
  usePostViewerDispatch,
  usePostViewerPrefetch,
} from './PostViewerProvider';
import media from '../../lib/styles/media';
import { themedPalette } from '../../lib/styles/themes';

const PostSeriesInfoBlock = styled.div`
  margin-top: 2rem;
  padding: 2rem 1.5rem;
  ${media.small} {
    padding: 1rem;
  }
  background: ${themedPalette.bg_element2};
  border-radius: 8px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.06);
  position: relative;
  h2 {
    a {
      text-decoration: none;
      color: inherit;
      &:hover {
        color: ${themedPalette.text3};
        text-decoration: underline;
      }
    }
    margin-top: 0;
    /* font-family: 'Spoqa Han Sans'; */
    color: ${themedPalette.text2};
    font-weight: bold;
    padding-right: 2rem;
    font-size: 1.5rem;
    ${media.small} {
      font-size: 1.125rem;
      padding-right: 2.5rem;
      margin-bottom: 1.5rem;
    }
  }
  .series-corner-image {
    position: absolute;
    right: 1.5rem;
    top: 0px;
    ${media.small} {
      right: 1rem;
      width: 1.5rem;
      height: auto;
    }
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  .series-number {
    font-size: 0.875rem;
    color: ${themedPalette.text3};
  }
`;

const Fold = styled.div`
  display: flex;
  align-items: center;
  margin-left: -5px;
  color: ${themedPalette.text2};
  line-height: 1;
  cursor: pointer;
  svg {
    margin-right: 0.25rem;
    color: ${themedPalette.text1};
    font-size: 1.5rem;
  }
  &:hover {
    color: ${themedPalette.text1};
    svg {
      color: ${themedPalette.text1};
    }
  }
`;

const Footer = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavigateButtonGroup = styled.div`
  display: flex;
  margin-left: 1.125rem;
`;

const NavigateButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: ${palette.teal6};
  background: ${themedPalette.bg_element1};
  border: 1px solid ${themedPalette.border4};
  padding: 0;
  cursor: pointer;
  &:hover {
    background: ${palette.teal6};
    color: white;
  }

  & + & {
    margin-left: 0.375rem;
  }

  &:disabled {
    cursor: default;
    background: ${themedPalette.bg_element2};
    border: 1px solid ${themedPalette.border4};
    color: ${themedPalette.text3};
    opacity: 0.3;
  }
`;

const PostList = styled.ol`
  padding-left: 0;
  line-height: 1.8;
  font-size: 1rem;
  /* font-family: 'Spoqa Han Sans'; */
  color: ${themedPalette.text2};
  counter-reset: item;
  ${media.small} {
    font-size: 0.875rem;
    margin-bottom: -1rem;
  }
  li {
    display: block;
  }
  li:before {
    content: counter(item) '. ';
    counter-increment: item;
    color: ${themedPalette.text3};
    font-style: italic;
    margin-right: 0.25rem;
  }
  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      color: ${themedPalette.text1};
      text-decoration: underline;
    }
  }
`;

export interface PostSeriesInfoProps extends RouteComponentProps {
  name: string;
  posts: {
    id: string;
    title: string;
    url_slug: string;
    user: {
      id: string;
      username: string;
    };
  }[];
  postId: string;
  username: string;
  urlSlug: string;
}

const PostSeriesInfo: React.FC<PostSeriesInfoProps> = ({
  name,
  posts,
  postId,
  username,
  history,
  urlSlug,
}) => {
  const currentIndex = useMemo(
    () => posts.findIndex((post) => post.id === postId),
    [postId, posts],
  );
  const [open, toggle, setValue] = useBoolean(false);

  // remember open state
  const dispatch = usePostViewerDispatch();
  const state = usePostViewerState();

  const prefetch = usePostViewerPrefetch();

  useEffect(() => {
    dispatch({
      type: 'SET_SERIES_OPEN',
      payload: open,
    });
  }, [dispatch, open]);

  useEffect(() => {
    setValue(state.seriesOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigatePrev = () => {
    const prevPost = posts[posts.findIndex((post) => post.id === postId) - 1];
    if (!prevPost) return;
    history.push(`/@${username}/${prevPost.url_slug}`);
  };

  const navigateNext = () => {
    const nextPos = posts[posts.findIndex((post) => post.id === postId) + 1];
    if (!nextPos) return;
    history.push(`/@${username}/${nextPos.url_slug}`);
  };

  const onMouseEnter = () => {
    prefetch();
  };

  return (
    <PostSeriesInfoBlock onMouseEnter={onMouseEnter}>
      <h2>
        <Link to={`/@${username}/series/${urlSlug}`}>{name}</Link>
      </h2>
      <SeriesImage className="series-corner-image" />
      {open && (
        <PostList>
          {posts.map((post) => (
            <li key={post.id}>
              <NavLink
                to={`/@${username}/${post.url_slug}`}
                activeStyle={{ color: palette.teal6, fontWeight: 'bold' }}
              >
                {post.title}
              </NavLink>
            </li>
          ))}
        </PostList>
      )}
      <Footer>
        <Fold onClick={toggle}>
          {open ? (
            <>
              <MdArrowDropUp />
              숨기기
            </>
          ) : (
            <>
              <MdArrowDropDown />
              목록 보기
            </>
          )}
        </Fold>
        <Right>
          <div className="series-number">
            {currentIndex + 1}/{posts.length}
          </div>
          <NavigateButtonGroup>
            <NavigateButton
              disabled={currentIndex === 0}
              onClick={navigatePrev}
            >
              <MdChevronLeft />
            </NavigateButton>
            <NavigateButton
              disabled={currentIndex === posts.length - 1}
              onClick={navigateNext}
            >
              <MdChevronRight />
            </NavigateButton>
          </NavigateButtonGroup>
        </Right>
      </Footer>
    </PostSeriesInfoBlock>
  );
};

export default withRouter(PostSeriesInfo);
