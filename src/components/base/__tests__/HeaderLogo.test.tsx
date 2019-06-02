import * as React from 'react';
import { render } from 'react-testing-library';
import HeaderLogo, { HeaderLogoProps } from '../HeaderLogo';
import { MemoryRouter } from 'react-router-dom';

describe('HeaderLogo', () => {
  const setup = (props: Partial<HeaderLogoProps> = {}) => {
    const initialProps: HeaderLogoProps = {
      custom: false,
      userLogo: null,
      velogUsername: null,
    };
    const utils = render(
      <MemoryRouter>
        <HeaderLogo {...initialProps} {...props} />
      </MemoryRouter>,
    );
    return {
      ...utils,
    };
  };

  it('shows logo svg when custom is false', () => {
    const { getByTestId } = setup();
    getByTestId('velog-logo');
  });

  it('shows null when custom is true and data is not loaded', () => {});
  it('shows custom velog title when custom is true data is loaded', () => {});
  it('shows fallback velog title when velog title is null', () => {});
});
