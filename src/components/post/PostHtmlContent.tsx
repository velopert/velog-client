import * as React from 'react';
import styled from 'styled-components';
import Typography from '../common/Typography';

const PostHtmlContentBlock = styled.div``;

export interface PostHtmlContentProps {
  html: string;
}

const PostHtmlContent: React.FC<PostHtmlContentProps> = ({ html }) => {
  return (
    <Typography>
      <PostHtmlContentBlock dangerouslySetInnerHTML={{ __html: html }} />
    </Typography>
  );
};

export default PostHtmlContent;
