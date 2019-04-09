import React, { FC } from 'react';
import styled from 'styled-components';
import PageTemplate from '../base/PageTemplate';

const PostTemplateBlock = styled(PageTemplate)``;

const PostTemplate: FC = () => {
  return <PostTemplateBlock>포스트임</PostTemplateBlock>;
};

export default PostTemplate;
