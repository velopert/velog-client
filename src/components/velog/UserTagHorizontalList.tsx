import React from 'react';
import styled, { css } from 'styled-components';
import media from '../../lib/styles/media';
import { Tag } from '../../lib/graphql/tags';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';
import { escapeForUrl } from '../../lib/utils';

export type UserTagHorizontalListProps = {
  active: string | null;
  tags: Tag[];
  postsCount: number;
  username: string;
};

function UserTagHorizontalList({
  active,
  tags,
  postsCount,
  username,
}: UserTagHorizontalListProps) {
  return (
    <Block>
      <TagItem to={`/@${username}`} active={active === null}>
        전체보기 <span>({postsCount})</span>
      </TagItem>
      {tags.map((tag) => (
        <TagItem
          active={active === escapeForUrl(tag.name)}
          key={tag.id}
          to={`@${username}?tag=${escapeForUrl(tag.name)}`}
        >
          {tag.name}
          <span>({tag.posts_count})</span>
        </TagItem>
      ))}
    </Block>
  );
}

const Block = styled.div`
  display: none;
  ${media.large} {
    display: flex;
  }
  overflow-x: auto;
  margin-top: -1.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;

  ${media.small} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  margin-bottom: 0.5rem;
`;

const TagItem = styled(Link)<{ active?: boolean }>`
  flex-shrink: 0;
  height: 1.5rem;
  font-size: 0.75rem;
  border-radius: 0.75rem;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  background: ${themedPalette.bg_element2};
  color: ${palette.gray8};
  display: flex;
  align-items: center;
  line-height: 1.5;

  span {
    margin-left: 0.25rem;
    color: ${palette.gray6};
    font-size: 0.75rem;
  }

  ${(props) =>
    props.active &&
    css`
      background: ${palette.teal6};
      color: white;
      span {
        color: white;
        opacity: 0.8;
      }
    `}

  text-decoration: none;

  & + & {
    margin-left: 0.5rem;
  }
`;

export default UserTagHorizontalList;
