import React from 'react';
import styled from 'styled-components';
import PageTemplate from '../base/PageTemplate';

const PostTemplateBlock = styled(PageTemplate)``;

interface PostTemplateProps {}

const PostTemplate: React.SFC<PostTemplateProps> = props => {
  return <PostTemplateBlock>포스트임</PostTemplateBlock>;
};

export default PostTemplate;
