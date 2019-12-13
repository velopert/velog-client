import React from 'react';
import styled from 'styled-components';
import TagItem from './TagItem';
import media from '../../lib/styles/media';

export interface TagListProps {
  link?: boolean;
  tags: string[];
  className?: string;
}

const TagList = ({ link, tags, className }: TagListProps) => {
  return (
    <TagListBlock className={className}>
      {tags.map(tag => (
        <TagItem key={tag} name={tag} link={link}>
          {tag}
        </TagItem>
      ))}
    </TagListBlock>
  );
};

const TagListBlock = styled.div`
  margin-top: 0.875rem;
  margin-bottom: -0.875rem;
  min-height: 0.875rem;
  ${media.small} {
    margin-top: 0.5rem;
    margin-bottom: -0.5rem;
    min-height: 0.5rem;
  }
`;

export default TagList;
