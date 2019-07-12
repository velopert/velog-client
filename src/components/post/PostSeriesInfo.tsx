import React, { useMemo } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { SeriesImage } from '../../static/svg';

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

const Fold = styled.div``;

const Footer = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: space-between;
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
}

const PostSeriesInfo: React.FC<PostSeriesInfoProps> = ({
  name,
  posts,
  postId,
}) => {
  const currentIndex = useMemo(
    () => posts.findIndex(post => post.id === postId),
    [postId, posts],
  );
  return (
    <PostSeriesInfoBlock>
      <h2>{name}</h2>
      <SeriesImage className="series-corner-image" />
      <Footer>
        <Fold>목록 보기</Fold>
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
