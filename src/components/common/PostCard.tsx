import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import RatioImage from './RatioImage';
import { ellipsis } from '../../lib/styles/utils';
import palette from '../../lib/styles/palette';
import { LikeIcon } from '../../static/svg';
import { PartialPost } from '../../lib/graphql/post';
import { formatDate } from '../../lib/utils';
import { userThumbnail } from '../../static/images';
import optimizeImage from '../../lib/optimizeImage';
import SkeletonTexts from './SkeletonTexts';
import Skeleton from './Skeleton';
import { mediaQuery } from '../../lib/styles/media';
import { Link } from 'react-router-dom';
import usePrefetchPost from '../../lib/hooks/usePrefetchPost';

export type PostCardProps = {
  post: PartialPost;
};

function PostCard({ post }: PostCardProps) {
  const url = `/@${post.user.username}/${post.url_slug}`;

  const prefetch = usePrefetchPost(post.user.username, post.url_slug);
  const prefetchTimeoutId = useRef<number | null>(null);

  const onMouseEnter = () => {
    prefetchTimeoutId.current = setTimeout(prefetch, 2000);
  };

  const onMouseLeave = () => {
    if (prefetchTimeoutId.current) {
      clearTimeout(prefetchTimeoutId.current);
    }
  };

  return (
    <Block onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {post.thumbnail && (
        <StyledLink to={url}>
          <RatioImage
            widthRatio={1.916}
            heightRatio={1}
            src={optimizeImage(post.thumbnail, 640)}
          />
        </StyledLink>
      )}
      <Content clamp={!!post.thumbnail}>
        <StyledLink to={url}>
          <h4>{post.title}</h4>
          <div className="description-wrapper">
            <p>
              {post.short_description.replace(/&#x3A;/g, ':')}
              {post.short_description.length === 150 && '...'}
            </p>
          </div>
        </StyledLink>
        <div className="sub-info">
          <span>{formatDate(post.released_at)}</span>
          <span className="separator">·</span>
          <span>{post.comments_count}개의 댓글</span>
        </div>
      </Content>
      <Footer>
        <Link className="userinfo" to={`/@${post.user.username}`}>
          <img
            src={optimizeImage(
              post.user.profile.thumbnail || userThumbnail,
              120,
            )}
            alt={`user thumbnail of ${post.user.username}`}
          />
          <span>
            by <b>{post.user.username}</b>
          </span>
        </Link>
        <div className="likes">
          <LikeIcon />
          {post.likes}
        </div>
      </Footer>
    </Block>
  );
}

export function PostCardSkeleton() {
  return (
    <SkeletonBlock>
      <div className="skeleton-thumbnail-wrapper">
        <Skeleton className="skeleton-thumbnail"></Skeleton>
      </div>
      <Content clamp={true}>
        <h4>
          <SkeletonTexts wordLengths={[2, 4, 3, 6, 5]} />
        </h4>
        <div className="description-wrapper">
          <div className="lines">
            <div className="line">
              <SkeletonTexts wordLengths={[2, 4, 3, 6, 2, 7]} useFlex />
            </div>
            <div className="line">
              <SkeletonTexts wordLengths={[3, 2]} />
            </div>
          </div>
        </div>
        <div className="sub-info">
          <span>
            <Skeleton width="3rem" />
          </span>
          <span className="separator"></span>
          <span>
            <Skeleton width="4rem" />
          </span>
        </div>
      </Content>
      <Footer>
        <div className="userinfo">
          <Skeleton
            width="1.5rem"
            height="1.5rem"
            marginRight="0.5rem"
            circle
          />
          <span>
            <Skeleton width="6rem" />
          </span>
        </div>
      </Footer>
    </SkeletonBlock>
  );
}

const StyledLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`;

const Block = styled.div`
  width: 20rem;
  background: white;
  border-radius: 4px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.04);
  transition: 0.25s box-shadow ease-in, 0.25s transform ease-in;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 20px 0 rgba(0, 0, 0, 0.08);
    ${mediaQuery(1024)} {
      transform: none;
    }
  }
  margin: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  ${mediaQuery(944)} {
    width: calc(50% - 2rem);
  }
  ${mediaQuery(767)} {
    margin: 0;
    width: 100%;
    & + & {
      margin-top: 1rem;
    }
  }
`;

const Content = styled.div<{ clamp: boolean }>`
  padding: 1rem;
  display: flex;
  flex: 1;
  flex-direction: column;
  h4 {
    font-size: 1rem;
    margin: 0;
    margin-bottom: 0.25rem;
    line-height: 1.5;
    ${ellipsis}
    color: ${palette.gray9};
    ${mediaQuery(767)} {
      white-space: initial;
    }
  }
  .description-wrapper {
    flex: 1;
  }
  p {
    margin: 0;
    word-break: break-word;
    overflow-wrap: break-word;
    font-size: 0.875rem;
    line-height: 1.5;
    ${props =>
      props.clamp &&
      css`
        height: 3.9375rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      `}
    /* ${props =>
      !props.clamp &&
      css`
        height: 15.875rem;
      `} */
  
    color: ${palette.gray7};
    margin-bottom: 1.5rem;
  }
  .sub-info {
    font-size: 0.75rem;
    line-height: 1.5;
    color: ${palette.gray6};
    .separator {
      margin-left: 0.25rem;
      margin-right: 0.25rem;
    }
  }
`;

const Footer = styled.div`
  padding: 0.625rem 1rem;
  border-top: 1px solid ${palette.gray0};
  display: flex;
  font-size: 0.75rem;
  line-height: 1.5;
  justify-content: space-between;
  .userinfo {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    img {
      object-fit: cover;
      border-radius: 50%;
      width: 1.5rem;
      height: 1.5rem;
      display: block;
      margin-right: 0.5rem;
    }
    span {
      color: ${palette.gray6};
      b {
        color: ${palette.gray8};
      }
    }
  }
  .likes {
    display: flex;
    align-items: center;
    svg {
      width: 0.75rem;
      height: 0.75rem;
      margin-right: 0.5rem;
    }
  }
`;

const SkeletonBlock = styled(Block)`
  .skeleton-thumbnail-wrapper {
    width: 100%;
    padding-top: 52.19%;
    position: relative;
    .skeleton-thumbnail {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .lines {
    height: 3.9375rem;
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
    .line {
      display: flex;
    }
    .line + .line {
      margin-top: 0.3rem;
    }
  }
`;

export default React.memo(PostCard);
