import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';

const WrapperLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`;

const HeaderUserMenuItemBlock = styled.div`
  color: ${themedPalette.text1};
  padding: 0.75rem 1rem;
  line-height: 1.5;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: ${themedPalette.bg_element2};
    color: ${themedPalette.primary1};
  }
`;

interface HeaderUserMenuItemProps {
  to?: string;
  onClick?: () => void;
}

const HeaderUserMenuItem: React.FC<HeaderUserMenuItemProps> = ({
  children,
  to,
  onClick,
}) => {
  const jsx = (
    <HeaderUserMenuItemBlock onClick={onClick}>
      {children}
    </HeaderUserMenuItemBlock>
  );
  return to ? (
    <WrapperLink to={to} style={{ display: 'block' }}>
      {jsx}
    </WrapperLink>
  ) : (
    jsx
  );
};

export default HeaderUserMenuItem;
