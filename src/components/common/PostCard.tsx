import React from 'react';
import styled, { css } from 'styled-components';
import RatioImage from './RatioImage';
import { ellipsis } from '../../lib/styles/utils';
import palette from '../../lib/styles/palette';
import { LikeIcon } from '../../static/svg';
import { PartialPost } from '../../lib/graphql/post';
import { formatDate } from '../../lib/utils';
import { userThumbnail } from '../../static/images';
import optimizeImage from '../../lib/optimizeImage';

export type PostCardProps = {
  post: PartialPost;
};

function PostCard({ post }: PostCardProps) {
  return (
    <Block>
      {post.thumbnail && (
        <RatioImage
          widthRatio={1.916}
          heightRatio={1}
          src={optimizeImage(post.thumbnail, 640)}
        />
      )}
      <Content clamp={!!post.thumbnail}>
        <h4>{post.title}</h4>
        <div className="description-wrapper">
          <p>
            {post.short_description}
            {post.short_description.length === 150 && '...'}
          </p>
        </div>
        <div className="sub-info">
          <span>{formatDate(post.released_at)}</span>
          <span className="separator">·</span>
          <span>{post.comments_count}개의 댓글</span>
        </div>
      </Content>
      <Footer>
        <div className="userinfo">
          <img
            src={post.user.profile.thumbnail || userThumbnail}
            alt={`user thumbnail of ${post.user.username}`}
          />
          <span>
            by <b>{post.user.username}</b>
          </span>
        </div>
        <div className="likes">
          <LikeIcon />
          {post.likes}
        </div>
      </Footer>
    </Block>
  );
}

const Block = styled.div`
  width: 20rem;
  background: white;
  border-radius: 4px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.04);
  margin: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
  }
  .description-wrapper {
    flex: 1;
  }
  p {
    margin: 0;
    word-break: keep-all;
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
    display: flex;
    align-items: center;
    img {
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

export default PostCard;
