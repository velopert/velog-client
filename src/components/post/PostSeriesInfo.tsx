import React, { useMemo, useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { SeriesImage } from '../../static/svg';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import useBoolean from '../../lib/hooks/useBoolean';
import { Link } from 'react-router-dom';
import {
  usePostViewerState,
  usePostViewerDispatch,
} from './PostViewerProvider';

const PostSeriesInfoBlock = styled.div`
  margin-top: 2rem;
  padding: 2rem 1.5rem;
  background: ${palette.gray0};
  border-radius: 8px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.06);
  position: relative;
  h2 {
    margin-top: 0;
    font-family: 'Spoqa Han Sans';
    color: ${palette.gray7};
    font-weight: bold;
    padding-right: 2rem;
    font-size: 1.5rem;
  }
  .series-corner-image {
    position: absolute;
    right: 1.5rem;
    top: 0px;
  }
`;

const Right = styled.div`
  .series-number {
  }
`;

const Fold = styled.div`
  display: flex;
  align-items: center;
  margin-left: -5px;
  color: ${palette.gray7};
  line-height: 1;
  cursor: pointer;
  svg {
    margin-right: 0.25rem;
    color: ${palette.gray8};
    font-size: 1.5rem;
  }
  &:hover {
    color: ${palette.gray9};
    svg {
      color: ${palette.gray9};
    }
  }
`;

const Footer = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostList = styled.ol`
  padding-left: 0;
  line-height: 1.8;
  font-size: 1rem;
  font-family: 'Spoqa Han Sans';
  color: ${palette.gray7};
  counter-reset: item;
  li {
    display: block;
  }
  li:before {
    content: counter(item) '. ';
    counter-increment: item;
    color: ${palette.gray5};
    font-style: italic;
    margin-right: 0.25rem;
  }
  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      color: ${palette.gray9};
      text-decoration: underline;
    }
  }
`;

export interface PostSeriesInfoProps {
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
}

const PostSeriesInfo: React.FC<PostSeriesInfoProps> = ({
  name,
  posts,
  postId,
  username,
}) => {
  const currentIndex = useMemo(
    () => posts.findIndex(post => post.id === postId),
    [postId, posts],
  );
  const [open, toggle, setValue] = useBoolean(false);

  // remember open state
  const dispatch = usePostViewerDispatch();
  const state = usePostViewerState();

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

  return (
    <PostSeriesInfoBlock>
      <h2>{name}</h2>
      <SeriesImage className="series-corner-image" />
      {open && (
        <PostList>
          {posts.map(post => (
            <li key={post.id}>
              <Link to={`/@${username}/${post.url_slug}`}>{post.title}</Link>
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
            {currentIndex + 1} / {posts.length}
          </div>
        </Right>
      </Footer>
    </PostSeriesInfoBlock>
  );
};

export default PostSeriesInfo;
