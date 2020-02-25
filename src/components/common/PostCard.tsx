import React from 'react';
import styled from 'styled-components';
import RatioImage from './RatioImage';
import { ellipsis } from '../../lib/styles/utils';
import palette from '../../lib/styles/palette';
import { LikeIcon } from '../../static/svg';

export type PostCardProps = {};

function PostCard(props: PostCardProps) {
  return (
    <Block>
      <RatioImage
        widthRatio={1.916}
        heightRatio={1}
        src="https://img.velog.io/images/velog/post/ebf87853-b6b7-47af-a659-d97fb39e66b0/velog_logo.png?w=768"
      />
      <Content>
        <h4>벨로그 v2 업데이트 안내</h4>
        <p>
          Node.js, PHP 등 익숙한 언어들을 던지고 생뚱맞은 장고를 택한 이유는 단
          하나였습니다. 장고를 사용하시는 분들이 가장 많이 이야기하는,
          생산성입니다 내용이 더 길어지면 엉떻게 되니닌
        </p>
        <div className="sub-info">
          <span>2020년 2월 10일</span>
          <span className="separator">·</span>
          <span>64개의 댓글</span>
        </div>
      </Content>
      <Footer>
        <div className="userinfo">
          <img
            src="https://img.velog.io/images/velog/profile/9aa07f66-5fcd-41f4-84f2-91d73afcec28/green favicon.png?w=120"
            alt="post-thumbnail"
          />
          <span>
            by <b>velopert</b>
          </span>
        </div>
        <div className="likes">
          <LikeIcon />
          65
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
`;

const Content = styled.div`
  padding: 1rem;
  h4 {
    font-size: 1rem;
    margin: 0;
    margin-bottom: 0.25rem;
    line-height: 1.5;
    ${ellipsis}
    color: ${palette.gray9};
  }
  p {
    margin: 0;
    word-break: keep-all;
    overflow-wrap: break-word;
    font-size: 0.875rem;
    line-height: 1.5;
    height: 3.9375rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
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
