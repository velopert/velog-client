import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MarkdownRender from '../common/MarkdownRender';
import PostHtmlContent from './PostHtmlContent';
import { parseHeadings } from '../../lib/heading';
import { usePostViewerDispatch } from './PostViewerProvider';
import media from '../../lib/styles/media';

const PostContentBlock = styled.div`
  width: 768px;
  margin: 0 auto;
  margin-top: 5rem;
  ${media.medium} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  ${media.small} {
    width: 100%;
  }
`;

export interface PostContentProps {
  isMarkdown: boolean;
  body: string;
}

const PostContent: React.FC<PostContentProps> = ({ isMarkdown, body }) => {
  const [html, setHtml] = useState(isMarkdown ? null : body);
  const dispatch = usePostViewerDispatch();

  useEffect(() => {
    if (!html) return;
    const toc = parseHeadings(html);
    dispatch({ type: 'SET_TOC', payload: toc });
  }, [dispatch, html]);
  return (
    <PostContentBlock>
      {isMarkdown ? (
        <MarkdownRender markdown={body} onConvertFinish={setHtml} />
      ) : (
        <PostHtmlContent html={body} />
      )}
    </PostContentBlock>
  );
};

export default PostContent;
