import React from 'react';
import styled from 'styled-components';
import LinkedPost from './LinkedPostItem';
import { LinkedPosts } from '../../lib/graphql/post';
import VelogResponsive from '../velog/VelogResponsive';
import media from '../../lib/styles/media';

const LinkedPostsBlock = styled(VelogResponsive)`
  margin-top: 3rem;
  display: flex;
  ${media.small} {
    flex-direction: column-reverse;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;
const Wrapper = styled.div`
  min-width: 0;
  flex: 1;
  & + & {
    margin-left: 3rem;
  }

  ${media.small} {
    flex: initial;
    width: 100%;
    & + & {
      margin-left: 0;
      margin-bottom: 1.5rem;
    }
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
