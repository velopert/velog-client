import * as React from 'react';
import { render } from '@testing-library/react';
import HeaderLogo, { HeaderLogoProps } from '../HeaderLogo';
import { MemoryRouter } from 'react-router-dom';

describe('HeaderLogo', () => {
  const setup = (props: Partial<HeaderLogoProps> = {}) => {
    const initialProps: HeaderLogoProps = {
      custom: false,
      userLogo: null,
      username: null,
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

  it('shows empty when custom is true and data is not loaded', () => {
    const utils = setup({
      custom: true,
      userLogo: null,
      username: 'velopert',
    });
    expect(utils.container.innerHTML).toBe('<div></div>');
  });
  it('shows custom velog title when custom is true and data is loaded', () => {
    const { getByText } = setup({
      custom: true,
      userLogo: {
        logo_image: null,
        title: 'VELOPERT.LOG',
      },
      username: 'velopert',
    });
    getByText('VELOPERT.LOG');
  });
  it('shows fallback velog title when velog title is null', () => {
    const { getByText } = setup({
      custom: true,
      userLogo: {
        logo_image: null,
        title: null,
      },
      username: 'velopert',
    });
    getByText(`velopert.log`);
  });
});
