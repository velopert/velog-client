import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { userThumbnail } from '../../static/images';
import Tag from './TagItem';
import { PartialPost } from '../../lib/graphql/post';
import { formatDate } from '../../lib/utils';
import usePrefetchPost from '../../lib/hooks/usePrefetchPost';
import Skeleton from './Skeleton';
import SkeletonTexts from './SkeletonTexts';
import RatioImage from './RatioImage';
import media from '../../lib/styles/media';

const PostCardBlock = styled.div`
  padding-top: 4rem;
  padding-bottom: 4rem;
  ${media.small} {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  & > a {
    color: inherit;
    text-decoration: none;
  }
  &:first-child {
    padding-top: 0;
  }
  .user-info {
    display: flex;
    align-items: center;
    img {
      width: 3rem;
      height: 3rem;
      display: block;
      margin-right: 1rem;
      background: ${palette.gray0};
      object-fit: cover;
      border-radius: 1.5rem;
      box-shadow: 0px 0 8px rgba(0, 0, 0, 0.1);
      ${media.small} {
        width: 2rem;
        height: 2rem;
        border-radius: 1rem;
      }
    }
    .username {
      font-size: 0.875rem;
      color: ${palette.gray9};
      font-weight: bold;
      a {
        color: inherit;
        text-decoration: none;
        &:hover {
          color: ${palette.gray8};
        }
      }
    }
    margin-bottom: 1.5rem;
    ${media.small} {
      margin-bottom: 0.75rem;
    }
  }
  .post-thumbnail {
    margin-bottom: 1rem;
    ${media.small} {
    }
  }
  line-height: 1.5;
  h2 {
    font-size: 1.5rem;
    margin: 0;
    color: ${palette.gray9};
    ${media.small} {
      font-size: 1rem;
    }
  }
  p {
    margin-bottom: 2rem;
    margin-top: 0.5rem;
    font-size: 1rem;
    color: ${palette.gray7};
    ${media.small} {
      font-size: 0.875rem;
      margin-bottom: 1.5rem;
    }
  }
  .subinfo {
    margin-top: 1rem;
    color: ${palette.gray6};
    font-size: 0.875rem;
    ${media.small} {
      font-size: 0.75rem;
    }
    span {
    }
    span + span:before {
      content: ' · ';
    }
  }
  .tags-wrapper {
    margin-bottom: -0.875rem;
    ${media.small} {
      margin-bottom: -0.5rem;
    }
  }

  & + & {
    border-top: 1px solid ${palette.gray2};
  }
`;

interface PostCardProps {
  post: PartialPost;
  hideUser?: boolean;
}

const PostCard = ({ post, hideUser }: PostCardProps) => {
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

  const url = `/@${post.user.username}/${post.url_slug}`;
  const velogUrl = `/@${post.user.username}`;

  if (!post.user.profile) {
    console.log(post);
  }
  return (
    <PostCardBlock onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {!hideUser && (
        <div className="user-info">
          <Link to={velogUrl}>
            <img
              src={post.user.profile.thumbnail || userThumbnail}
              alt="thumbnail"
            />
          </Link>
          <div className="username">
            <Link to={`/@${post.user.username}`}>{post.user.username}</Link>
          </div>
        </div>
      )}
      {post.thumbnail && (
        <RatioImage
          src={post.thumbnail}
          alt="post-thumbnail"
          widthRatio={1.91}
          heightRatio={1}
          className="post-thumbnail"
        />
      )}
      <Link to={url}>
        <h2>{post.title}</h2>
      </Link>
      <p>{post.short_description}</p>
      <div className="tags-wrapper">
        {post.tags.map(tag => (
          <Tag key={tag} name={tag} link />
        ))}
      </div>
      <div className="subinfo">
        <span>{formatDate(post.released_at)}</span>
        <span>{post.comments_count}개의 댓글</span>
      </div>
    </PostCardBlock>
  );
};

export type PostCardSkeletonProps = {
  hideUser?: boolean;
};

export function PostCardSkeleton({ hideUser }: PostCardSkeletonProps) {
  return (
    <SkeletonBlock>
      {!hideUser && (
        <div className="user-info">
          <Skeleton
            className="user-thumbnail-skeleton"
            circle
            marginRight="1rem"
          />
          <div className="username">
            <Skeleton width="5rem" />
          </div>
        </div>
      )}
      <div className="post-thumbnail">
        <div className="thumbnail-skeleton-wrapper">
          <Skeleton className="skeleton" />
        </div>
      </div>
      <h2>
        <SkeletonTexts wordLengths={[4, 3, 2, 5, 3, 6]} useFlex />
      </h2>
      <div className="short-description">
        <div className="line">
          <SkeletonTexts wordLengths={[2, 4, 3, 6, 2, 7]} useFlex />
        </div>
        <div className="line">
          <SkeletonTexts wordLengths={[3, 2, 3, 4, 7, 3]} useFlex />
        </div>
        <div className="line">
          <SkeletonTexts wordLengths={[4, 3, 3]} />
        </div>
      </div>
      <div className="tags-skeleton">
        <Skeleton width="6rem" marginRight="0.875rem" />
        <Skeleton width="4rem" marginRight="0.875rem" />
        <Skeleton width="5rem" noSpacing />
      </div>
      <div className="subinfo">
        <Skeleton width="3em" marginRight="1rem" />
        <Skeleton width="6em" noSpacing />
      </div>
    </SkeletonBlock>
  );
}

const SkeletonBlock = styled(PostCardBlock)`
  h2 {
    display: flex;
    margin-top: 1.375rem;
    margin-bottom: 0.375rem;
  }
  .user-thumbnail-skeleton {
    width: 3rem;
    height: 3rem;
    ${media.small} {
      width: 2rem;
      height: 2rem;
    }
  }
  .thumbnail-skeleton-wrapper {
    width: 100%;
    padding-top: 52.35%;
    position: relative;
    .skeleton {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
  .short-description {
    margin-bottom: 2rem;
    margin-top: 1rem;
    font-size: 1rem;
    .line {
      display: flex;
    }
    .line + .line {
      margin-top: 0.5rem;
    }
  }
  .tags-skeleton {
    line-height: 1;
    font-size: 2rem;
    ${media.small} {
      font-size: 1.25rem;
    }
  }
`;

export default React.memo(PostCard);
