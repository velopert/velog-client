import * as React from 'react';
import styled from 'styled-components';
import { CurrentUser } from '../../lib/graphql/user';
import { MdArrowDropDown } from 'react-icons/md';
import { userThumbnail } from '../../static/images';
import palette from '../../lib/styles/palette';

const HeaderUserIconBlock = styled.div`
  cursor: pointer;
  img {
    display: block;
    height: 2.5rem;
    width: 2.5rem;
    box-shadow: 0px 0 8px rgba(0, 0, 0, 0.085);
    border-radius: 50%;
    object-fit: cover;
    transition: 0.125s all ease-in;
  }
  svg {
    font-size: 1.5rem;
    margin-left: 0.25rem;
    color: ${palette.gray6};
    transition: 0.125s all ease-in;
    margin-right: -0.4375rem;
  }
  display: flex;
  align-items: center;
  &:hover {
    img {
      box-shadow: 0px 0 12px rgba(0, 0, 0, 0.1);
    }
    svg {
      color: ${palette.gray9};
    }
  }
`;

export interface HeaderUserIconProps {
  user: CurrentUser;
  onClick: () => void;
}

// TODO: show user thumbnail
const HeaderUserIcon: React.FC<HeaderUserIconProps> = ({ onClick, user }) => {
  return (
    <HeaderUserIconBlock onClick={onClick}>
      <img src={user.profile.thumbnail || userThumbnail} alt="thumbnail" />
      <MdArrowDropDown />
    </HeaderUserIconBlock>
  );
};

export default HeaderUserIcon;
