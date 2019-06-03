import * as React from 'react';
import styled from 'styled-components';
import VelogResponsive from '../velog/VelogResponsive';
import palette from '../../lib/styles/palette';

const PostHeadBlock = styled(VelogResponsive)`
  margin-top: 5.5rem;
  h1 {
    font-size: 3rem;
    line-height: 1.25;
    letter-spacing: -0.02rem;
    margin-top: 0;
    font-weight: 800;
    color: ${palette.gray8};
  }
`;

export interface PostHeadProps {
  title: string;
  tags: string[];
  username: string;
  date: string | number;
}

const PostHead: React.FC<PostHeadProps> = ({ title }) => {
  return (
    <PostHeadBlock>
      <h1>{title}</h1>
    </PostHeadBlock>
  );
};

export default PostHead;
