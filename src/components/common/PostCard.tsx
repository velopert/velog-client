import * as React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { userThumbnail } from '../../static/images';
import Tag from './Tag';

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
`;

interface PostCardProps {}

const PostCard: React.SFC<PostCardProps> = props => {
  return (
    <PostCardBlock>
      <div className="user-info">
        <img src={userThumbnail} />
        <div className="username">velopert</div>
      </div>
      <img
        className="post-thumbnail"
        src="https://images.velog.io/post-images/p_ssungnni/47ef3d00-1f95-11e9-bad7-f369e1fa7a4b/-2019-01-24-2.02.24.png"
      />
      <h2>제목제목</h2>
      <p>내용내용내용내용... 내용</p>
      <div className="subinfo">
        <span>2019년 3월 23일</span>
        <span>0개의 댓글</span>
      </div>
      <div className="tags-wrapper">
        <Tag>리액트</Tag>
        <Tag>웹 개발</Tag>
        <Tag>몰라</Tag>
      </div>
    </PostCardBlock>
  );
};

export default PostCard;
