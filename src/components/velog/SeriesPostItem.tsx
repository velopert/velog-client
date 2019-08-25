import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { emptyThumbnail } from '../../static/images';
import { formatDate } from '../../lib/utils';

const SeriesPostItemBlock = styled.div`
  font-family: 'Spoqa Han Sans', -apple-system, BlinkMacSystemFont,
    -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Apple SD Gothic Neo',
    arial, 나눔고딕, 'Nanum Gothic', 돋움;

  & + & {
    margin-top: 4rem;
  }
  display: flex;
  section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    min-width: 0;
    letter-spacing: -0.02em;
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
    .date {
      color: ${palette.gray5};
      font-size: 0.875rem;
    }
    p {
      color: ${palette.gray7};
      font-size: 1rem;
      line-height: 1.5rem;
      margin-top: 0.5rem;
    }
  }
  img {
    margin-left: 2.25rem;
    width: 11.25rem;
    height: 11.25rem;
    object-fit: cover;
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.15);
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
      <section>
        <div>
          <h2>
            <span className="number">1.</span>
            {title}
          </h2>
          <p>{description}</p>
        </div>

        <div className="date">{formatDate(date)}</div>
      </section>
      <img src={thumbnail || emptyThumbnail} alt="post-thumbnail" />
    </SeriesPostItemBlock>
  );
};

export default SeriesPostItem;
