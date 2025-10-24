import * as React from 'react';
import styled, { css } from 'styled-components';
import { themedPalette } from '../../lib/styles/themes';
import { Link } from 'react-router-dom';
import { escapeForUrl } from '../../lib/utils';
import media from '../../lib/styles/media';
import VLink from './VLink';

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
  background: ${themedPalette.bg_tag};
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
  font-size: 1rem;
  ${media.small} {
    height: 1.5rem;
    font-size: 0.75rem;
    border-radius: 0.75rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const TagDiv = styled.div`
  ${tagStyle}
`;

const TagLink = styled(VLink)`
  ${tagStyle}
  &:hover {
    opacity: 0.75;
  }
`;

export default TagItem;
