import * as React from 'react';
import styled from 'styled-components';
import VelogResponsive from '../velog/VelogResponsive';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import media from '../../lib/styles/media';

const PostCommentsTemplateBlock = styled(VelogResponsive)`
  margin-top: 3rem;
  color: ${palette.gray8};
  h4 {
    font-size: 1.125rem;
    line-height: 1.5;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  ${media.small} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const Contents = styled.div``;

export interface PostCommentsTemplateProps {
  count: number;
}

const PostCommentsTemplate: React.FC<PostCommentsTemplateProps> = ({
  count,
  children,
}) => {
  return (
    <PostCommentsTemplateBlock>
      <h4>{count}개의 댓글</h4>
      <Contents>{children}</Contents>
    </PostCommentsTemplateBlock>
  );
};

export default PostCommentsTemplate;
