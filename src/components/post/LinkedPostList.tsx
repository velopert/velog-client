import React from 'react';
import styled from 'styled-components';
import LinkedPost from './LinkedPostItem';
import { LinkedPosts } from '../../lib/graphql/post';
import VelogResponsive from '../velog/VelogResponsive';

const LinkedPostsBlock = styled(VelogResponsive)`
  margin-top: 3rem;
  display: flex;
`;
const Wrapper = styled.div`
  flex: 1;
  & + & {
    margin-left: 3rem;
  }
`;

export interface LinkedPostListProps {
  linkedPosts: LinkedPosts;
}

const LinkedPostList: React.FC<LinkedPostListProps> = ({ linkedPosts }) => {
  return (
    <LinkedPostsBlock>
      <Wrapper>
        <LinkedPost linkedPost={linkedPosts.previous} />
      </Wrapper>
      <Wrapper>
        <LinkedPost right linkedPost={linkedPosts.next} />
      </Wrapper>
    </LinkedPostsBlock>
  );
};

export default LinkedPostList;
