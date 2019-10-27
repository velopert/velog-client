import * as React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';
import { escapeForUrl } from '../../lib/utils';

type TagItemProps = {
  name: string;
  link?: boolean;
};

const TagItem: React.FC<TagItemProps> = ({ name, link }) => {
  if (link) {
    return <TagLink to={`/tags/${escapeForUrl(name)}`}>{name}</TagLink>;
  }
  return <TagDiv>{name}</TagDiv>;
};

const tagStyle = css`
  margin-bottom: 0.875rem;
  background: ${palette.gray1};
  padding-left: 1rem;
  padding-right: 1rem;
  height: 2rem;
  border-radius: 1rem;
  display: inline-flex;
  align-items: center;
  margin-right: 0.875rem;
  color: ${palette.teal7};
  text-decoration: none;
  font-weight: 500;

  font-size: 1rem;
`;

const TagDiv = styled.div`
  ${tagStyle}
`;

const TagLink = styled(Link)`
  ${tagStyle}
  &:hover {
    background: ${palette.gray0};
  }
`;

export default TagItem;
