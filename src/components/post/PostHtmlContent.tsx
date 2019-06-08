import * as React from 'react';
import styled from 'styled-components';

const PostHtmlContentBlock = styled.div``;

export interface PostHtmlContentProps {}

const PostHtmlContent: React.FC<PostHtmlContentProps> = props => {
  return <PostHtmlContentBlock />;
};

export default PostHtmlContent;
