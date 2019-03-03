import * as React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { userThumbnail } from '../../static/images';
import Tag from './Tag';
import { PartialPost } from '../../lib/graphql/post';

const PostCardBlock = styled.div`
  padding-top: 4rem;
  padding-bottom: 4rem;
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
    }
    .username {
      font-size: 0.875rem;
      color: ${palette.gray9};
      font-weight: bold;
    }
    margin-bottom: 1.5rem;
  }
  .post-thumbnail {
    width: 100%;
    max-height: 369px;
    margin-bottom: 1rem;
    object-fit: cover;
  }
  line-height: 1.5;
  h2 {
    font-size: 1.5rem;
    margin: 0;
    color: ${palette.gray9};
  }
  p {
    margin-bottom: 2rem;
    margin-top: 0.5rem;
    font-size: 1rem;
    color: ${palette.gray7};
  }
  .subinfo {
    color: ${palette.gray6};
    font-size: 0.875rem;
    span {
    }
    span + span:before {
      content: ' · ';
    }
  }
  .tags-wrapper {
    margin-top: 0.5rem;
  }

  & + & {
    border-top: 1px solid ${palette.gray2};
  }
`;

interface PostCardProps {
  post: PartialPost;
}

const PostCard: React.SFC<PostCardProps> = React.memo(({ post }) => {
  return (
    <PostCardBlock>
      <div className="user-info">
        <img src={post.user.profile.thumbnail || userThumbnail} />
        <div className="username">{post.user.username}</div>
      </div>
      {post.thumbnail && (
        <img className="post-thumbnail" src={post.thumbnail} />
      )}
      <h2>{post.title}</h2>
      <p>{post.short_description}</p>
      <div className="subinfo">
        <span>2019년 3월 23일</span>
        <span>{post.comments_count}개의 댓글</span>
      </div>
      <div className="tags-wrapper">
        {post.tags.map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </PostCardBlock>
  );
});

export default PostCard;
