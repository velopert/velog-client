import * as React from 'react';
import styled from 'styled-components';
import { Logo } from '../../static/svg';
import { UserLogo } from '../../modules/header';

const HeaderLogoBlock = styled.div``;

export interface HeaderLogoProps {
  custom: boolean;
  userLogo: UserLogo | null;
  velogUsername: string | null;
}

const HeaderLogo: React.FC<HeaderLogoProps> = props => {
  return <HeaderLogoBlock />;
};

export default HeaderLogo;
