import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Logo } from '../../static/svg';
import { UserLogo } from '../../modules/header';

const createFallbackTitle = (username: string | null) => {
  if (!username) return null;
  const lastChar = username.slice(-1).toLowerCase();
  if (lastChar === 's') {
    return `${username}' velog`;
  }
  return `${username}'s velog`;
};

const HeaderLogoBlock = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface HeaderLogoProps {
  custom: boolean;
  userLogo: UserLogo | null;
  velogUsername: string | null;
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({
  custom,
  userLogo,
  velogUsername,
}) => {
  if (!custom) {
    return (
      <HeaderLogoBlock to="/">
        <Logo data-testid="velog-logo" />
      </HeaderLogoBlock>
    );
  }

  if (!velogUsername) return null;
  const velogPath = `/@${velogUsername}`;
  return (
    <HeaderLogoBlock to={velogPath}>
      {createFallbackTitle(velogUsername)}
    </HeaderLogoBlock>
  );
};

export default HeaderLogo;
