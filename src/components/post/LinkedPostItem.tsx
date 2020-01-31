import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import palette from '../../lib/styles/palette';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { LinkedPost } from '../../lib/graphql/post';
import { ellipsis } from '../../lib/styles/utils';
import PlainLink from '../common/PlainLink';
import media from '../../lib/styles/media';

const bounceLeft = keyframes`
  0% {
    transform: translateX(0px)
  }
  50% {
    transform: translateX(-8px)
  }
  100% {
    transform: translateX(0px)
  }
`;

const bounceRight = keyframes`
  0% {
    transform: translateX(0px)
  }
  50% {
    transform: translateX(8px)
  }
  100% {
    transform: translateX(0px)
  }
`;

const Circle = styled.div<{ right?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${palette.teal5};
  font-size: 1.5rem;
  color: ${palette.teal5};
  ${props =>
    props.right
      ? css`
          margin-left: 1rem;
        `
      : css`
          margin-right: 1rem;
        `}
`;

const LinkedPostItemBlock = styled(PlainLink)<{ right?: boolean }>`
  cursor: pointer;
  background: ${palette.gray0};
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.06);
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
  height: 4rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  ${props =>
    props.right &&
    css`
      flex-direction: row-reverse;
    `}
  &:hover {
    ${Circle} {
      animation-duration: 0.35s;
      animation-name: ${props => (props.right ? bounceRight : bounceLeft)};
      animation-fill-mode: forwards;
      animation-timing-function: ease-out;
    }
  }
`;

const Text = styled.div<{ right?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.right ? 'flex-end' : 'flex-start')};
  line-height: 1;
  min-width: 0;
  .description {
    font-size: 0.75rem;
    font-weight: bold;
    color: ${palette.gray7};
  }
  h3 {
    ${props =>
      props.right &&
      css`
        text-align: right;
      `};
    width: 100%;
    font-size: 1.125rem;
    color: ${palette.gray7};
    line-height: 1.15;
    margin: 0;
    margin-top: 0.5rem;
    ${media.small} {
      font-size: 1rem;
    }
    ${ellipsis};
  }
`;

export interface LinkedPostItemProps {
  right?: boolean;
  linkedPost: LinkedPost | null;
}

const LinkedPostItem: React.FC<LinkedPostItemProps> = ({
  right,
  linkedPost,
}) => {
  if (!linkedPost) {
    return null;
  }
  const to = `/@${linkedPost.user.username}/${linkedPost.url_slug}`;

  return (
    <LinkedPostItemBlock right={right} to={to}>
      <Circle right={right}>
        {right ? <MdArrowForward /> : <MdArrowBack />}
      </Circle>
      <Text right={right}>
        <div className="description">{right ? '다음' : '이전'} 포스트</div>
        <h3>{linkedPost.title}</h3>
      </Text>
    </LinkedPostItemBlock>
  );
};

export default LinkedPostItem;
