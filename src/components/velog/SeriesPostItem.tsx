import React from 'react';
import styled, { css } from 'styled-components';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import { emptyThumbnail } from '../../static/images';
import { formatDate } from '../../lib/utils';
import PostLink from '../common/PostLink';
import SkeletonTexts from '../common/SkeletonTexts';
import Skeleton from '../common/Skeleton';
import media from '../../lib/styles/media';
import optimizeImage from '../../lib/optimizeImage';

const SeriesPostItemBlock = styled.div<{ edit?: boolean }>`
  /* font-family: 'Spoqa Han Sans', -apple-system, BlinkMacSystemFont,
    -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Apple SD Gothic Neo',
    arial, 나눔고딕, 'Nanum Gothic', 돋움; */

  h2 {
    margin: 0;
    line-height: 1.5;
    font-size: 1.325rem;
    color: ${themedPalette.text2};
    .number {
      color: ${themedPalette.text3};
      margin-right: 0.25rem;
      font-style: italic;
    }
    a {
      transition: 0.125s ease-in color;
      color: inherit;
      text-decoration: none;
      &:hover {
        color: ${themedPalette.text1};
        text-decoration: underline;
      }
    }
  }

  & + & {
    margin-top: 4rem;
    ${media.small} {
      margin-top: 6rem;
    }
  }
  section {
    margin-top: 1rem;
    display: flex;
    align-items: flex-start;
    flex: 1;
    min-width: 0;
    letter-spacing: -0.004em;
    height: 6.25rem;

    ${media.small} {
      flex-direction: column;
      height: auto;
    }

    .post-info {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      p {
        color: ${themedPalette.text2};
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
    ${media.small} {
      width: 100%;
      height: auto;
    }
    &.empty-thumbnail {
      ${media.small} {
        display: none;
      }
    }
  }
  .date {
    color: ${themedPalette.text3};
    font-size: 0.875rem;
    ${media.small} {
      margin-top: 1rem;
    }
  }

  ${(props) =>
    props.edit &&
    css`
      padding: 1rem;
      background: ${themedPalette.bg_element1};
      border-radius: 4px;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.06);
    `}
`;

export interface SeriesPostItemProps {
  index: number;
  title: string;
  description: string;
  date: string;
  thumbnail: string | null;
  urlSlug: string;
  username: string;
  edit?: boolean;
}

const SeriesPostItem: React.FC<SeriesPostItemProps> = ({
  index,
  title,
  description,
  date,
  thumbnail,
  username,
  urlSlug,
  edit,
}) => {
  return (
    <SeriesPostItemBlock edit={edit}>
      <h2>
        <span className="number">{index}.</span>
        {edit ? (
          <span>{title}</span>
        ) : (
          <PostLink username={username} urlSlug={urlSlug}>
            {title}
          </PostLink>
        )}
      </h2>
      <section>
        {edit ? (
          <img
            src={optimizeImage(thumbnail || emptyThumbnail, 768)}
            alt="post-thumbnail"
          />
        ) : (
          <PostLink username={username} urlSlug={urlSlug}>
            <img
              src={optimizeImage(thumbnail || emptyThumbnail, 768)}
              alt="post-thumbnail"
              className={thumbnail ? '' : 'empty-thumbnail'}
            />
          </PostLink>
        )}
        <div className="post-info">
          <p>{description}</p>
          <div className="date">{formatDate(date)}</div>
        </div>
      </section>
    </SeriesPostItemBlock>
  );
};

export function SeriesPostItemSkeleton() {
  return (
    <SkeletonBlock>
      <h2>
        <SkeletonTexts wordLengths={[3, 2, 4, 3]} />
      </h2>
      <section>
        <div className="img-placeholder">
          <Skeleton width="100%" height="100%" />
        </div>
        <div className="post-info">
          <p>
            <SkeletonTexts wordLengths={[4, 4, 7, 3, 4, 2, 4, 6, 3]} />
          </p>
        </div>
      </section>
    </SkeletonBlock>
  );
}

const SkeletonBlock = styled(SeriesPostItemBlock)`
  h2 {
    height: 1.9875rem;
    display: flex;
    align-items: center;
  }
  .img-placeholder {
    width: 12rem;
    height: 6.25rem;
    margin-right: 1rem;
    ${media.small} {
      width: 100%;
      height: 320px;
    }
  }
  .post-info {
    p {
    }
  }
`;

export default SeriesPostItem;
