import * as React from 'react';
import styled from 'styled-components';
import MarkdownRender from '../common/MarkdownRender';
import PostHtmlContent from './PostHtmlContent';

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
      {isMarkdown ? (
        <MarkdownRender markdown={body} />
      ) : (
        <PostHtmlContent html={body} />
      )}
    </PostContentBlock>
  );
};

export default PostContent;
