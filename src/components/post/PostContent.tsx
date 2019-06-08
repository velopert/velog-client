import * as React from 'react';
import styled from 'styled-components';
import MarkdownRender from '../common/MarkdownRender';
import palette from '../../lib/styles/palette';

const PostContentBlock = styled.div`
  width: 768px;
  margin: 0 auto;
  margin-top: 5rem;
`;

export interface PostContentProps {
  isMarkdown: boolean;
  body: string;
}

const PostContent: React.FC<PostContentProps> = ({ isMarkdown, body }) => {
  return (
    <PostContentBlock>
      {isMarkdown ? <MarkdownRender markdown={body} /> : null}
    </PostContentBlock>
  );
};

export default PostContent;
