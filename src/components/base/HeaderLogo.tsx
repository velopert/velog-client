import * as React from 'react';
import styled from 'styled-components';
import { Logo, VelogIcon } from '../../static/svg';
import { UserLogo } from '../../modules/header';
import { themedPalette } from '../../lib/styles/themes';
import { createFallbackTitle } from '../../lib/utils';
import media from '../../lib/styles/media';
import { ellipsis } from '../../lib/styles/utils';
import VLink from '../common/VLink';

export interface HeaderLogoProps {
  custom: boolean;
  userLogo: UserLogo | null;
  username: string | null;
}

const HeaderLogo: React.FC<HeaderLogoProps> = ({
  custom,
  userLogo,
  username,
}) => {
  if (!custom) {
    return (
      <HeaderLogoBlock>
        <VLink to="/">
          <Logo data-testid="velog-logo" className="velog-logo" />
        </VLink>
      </HeaderLogoBlock>
    );
  }
  if (!userLogo) return <div />;
  if (!username) return <div />;
  const velogPath = `/@${username}/posts`;
  return (
    <HeaderLogoBlock>
      <VelogLogoLink to="/">
        <VelogIcon />
      </VelogLogoLink>
      <VLink to={velogPath} className="user-logo">
        {userLogo.title || createFallbackTitle(username)}
      </VLink>
    </HeaderLogoBlock>
  );
};

const HeaderLogoBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${themedPalette.text1};
  font-size: 1.3125rem;
  text-decoration: none;
  font-family: Fira Mono, monospace;

  ${media.medium} {
    font-size: 1.125rem;
    .velog-logo {
      height: 1.25rem;
    }
  }

  a {
    display: flex;
    align-items: center;
    color: inherit;
    text-decoration: none;
  }

  .user-logo {
    display: block;
    max-width: calc(100vw - 200px);
    ${ellipsis};
  }
`;

const VelogLogoLink = styled(VLink)`
  color: inherit;

  svg {
    color: inherit;
    margin-right: 1rem;
    width: 1.75rem;
    height: 1.75rem;
    display: block;
    ${media.medium} {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.75rem;
    }
  }
`;

export default HeaderLogo;
