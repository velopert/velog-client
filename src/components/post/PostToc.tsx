import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Sticky from '../common/Sticky';
import { usePostViewerState } from './PostViewerProvider';

const Wrapper = styled.div`
  position: relative;
  margin-top: 2rem;
`;
const Positioner = styled.div`
  position: absolute;
  left: 100%;
`;

const PostTocBlock = styled(Sticky)`
  width: 240px;
  margin-left: 3rem;
  border-left: 2px solid ${palette.teal4};
  padding-left: 0.75rem;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  color: ${palette.gray6};
  line-height: 1.5;
  font-size: 0.875rem;
`;

const TocItem = styled.div`
  display: block;
  a {
    &:hover {
      color: ${palette.gray9};
    }
    text-decoration: none;
    color: inherit;
  }
  & + & {
    margin-top: 4px;
  }
`;

export interface PostTocProps {}

const PostToc: React.FC<PostTocProps> = props => {
  const { toc } = usePostViewerState();
  if (!toc) return null;
  return (
    <Wrapper>
      <Positioner>
        <PostTocBlock top={112}>
          {toc.map(item => (
            <TocItem key={item.id} style={{ marginLeft: item.level * 12 }}>
              <a href={`#${item.id}`}>{item.text}</a>
            </TocItem>
          ))}
        </PostTocBlock>
      </Positioner>
    </Wrapper>
  );
};

export default PostToc;
