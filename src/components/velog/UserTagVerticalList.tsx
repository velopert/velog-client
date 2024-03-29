import React from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../lib/styles/themes';
import SideArea from './SideArea';
import { Tag } from '../../lib/graphql/tags';
import { Link } from 'react-router-dom';
import { escapeForUrl } from '../../lib/utils';

export type UserTagVerticalListProps = {
  active: string | null;
  tags: Tag[];
  postsCount: number;
  username: string;
};

function UserTagVerticalList({
  tags,
  active,
  postsCount,
  username,
}: UserTagVerticalListProps) {
  return (
    <SideArea>
      <Block>
        <div className="title">태그 목록</div>
        <ul>
          <ListItem active={active === null}>
            <Link to={`/@${username}`}>전체보기</Link>
            <span>({postsCount})</span>
          </ListItem>
          {tags.map((tag) => (
            <ListItem active={active === escapeForUrl(tag.name)} key={tag.id}>
              <Link to={`/@${username}?tag=${escapeForUrl(tag.name)}`}>
                {tag.name}
              </Link>
              <span>({tag.posts_count})</span>
            </ListItem>
          ))}
        </ul>
      </Block>
    </SideArea>
  );
}

const Block = styled.div`
  .title {
    font-size: 1rem;
    line-height: 1.5;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid ${themedPalette.border2};
    margin-bottom: 1rem;
    color: ${themedPalette.text2};
    font-weight: bold;
  }
  ul {
    list-style: none;
    /* margin-left: 0; */
    padding-left: 0;
  }
`;

const ListItem = styled.li<{ active?: boolean }>`
  color: ${themedPalette.text1};
  font-size: 0.875rem;
  line-height: 1.5;

  a {
    color: inherit;
    text-decoration: none;
    &:hover {
      color: ${themedPalette.text1};
      ${(props) =>
        props.active &&
        `
    color: ${themedPalette.primary2};
  `}
      text-decoration: underline;
      span {
        text-decoration: none;
      }
    }
  }

  ${(props) =>
    props.active &&
    `
    color: ${themedPalette.primary2};
    font-weight: bold;
  `}

  span {
    margin-left: 0.5rem;
    color: ${themedPalette.text3};
    font-weight: normal;
  }

  & + & {
    margin-top: 0.25rem;
  }
`;

export default UserTagVerticalList;
