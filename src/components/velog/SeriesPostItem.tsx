import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { emptyThumbnail } from '../../static/images';
import { formatDate } from '../../lib/utils';

const SeriesPostItemBlock = styled.div`
  font-family: 'Spoqa Han Sans', -apple-system, BlinkMacSystemFont,
    -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Apple SD Gothic Neo',
    arial, 나눔고딕, 'Nanum Gothic', 돋움;

  h2 {
    margin: 0;
    line-height: 1.5;
    font-size: 1.325rem;
    color: ${palette.gray8};
    .number {
      color: ${palette.gray5};
      margin-right: 0.25rem;
      font-style: italic;
    }
  }

  & + & {
    margin-top: 4rem;
  }
  section {
    margin-top: 1rem;
    display: flex;
    align-items: flex-start;
    flex: 1;
    min-width: 0;
    letter-spacing: -0.02em;
    height: 6.25rem;
    .post-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      p {
        color: ${palette.gray7};
        font-size: 1rem;
        line-height: 1.5rem;
        margin: 0;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
  img {
    margin-right: 1rem;
    width: 12rem;
    height: 6.25rem;
    object-fit: cover;
    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.15);
  }
  .date {
    color: ${palette.gray5};
    font-size: 0.875rem;
  }
`;

export interface SeriesPostItemProps {
  index: number;
  title: string;
  description: string;
  date: string;
  thumbnail: string | null;
}

const SeriesPostItem: React.FC<SeriesPostItemProps> = ({
  index,
  title,
  description,
  date,
  thumbnail,
}) => {
  return (
    <SeriesPostItemBlock>
      <h2>
        <span className="number">{index}.</span>
        {title}
      </h2>
      <section>
        <img src={thumbnail || emptyThumbnail} alt="post-thumbnail" />
        <div className="post-info">
          <p>{description}</p>
          <div className="date">{formatDate(date)}</div>
        </div>
      </section>
    </SeriesPostItemBlock>
  );
};

export default SeriesPostItem;
