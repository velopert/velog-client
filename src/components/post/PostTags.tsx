import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';

const PostTagsBlock = styled.div`
  margin-top: 0.875rem;
  margin-bottom: -0.875rem;
  min-height: 0.875rem;
`;

const Tag = styled(Link)`
  margin-bottom: 0.875rem;
  background: ${themedPalette.bg_element2};
  padding-left: 1rem;
  padding-right: 1rem;
  height: 2rem;
  border-radius: 1rem;
  display: inline-flex;
  align-items: center;
  margin-right: 0.875rem;
  color: ${themedPalette.primary1};
  text-decoration: none;
  font-weight: 500;
  &:hover {
    background: ${themedPalette.bg_element2};
  }
  font-size: 0.875rem;
`;

export interface PostTagsProps {
  tags: string[];
}

const PostTags: React.FC<PostTagsProps> = ({ tags }) => {
  return (
    <PostTagsBlock>
      {tags.map((tag) => (
        <Tag key={tag} to={`/tags/${tag}`}>
          {tag}
        </Tag>
      ))}
    </PostTagsBlock>
  );
};

export default PostTags;
