import * as React from 'react';
import { render } from '@testing-library/react';
import UserProfile, { UserProfileProps } from '../UserProfile';
import { MemoryRouter } from 'react-router-dom';

describe('UserProfile', () => {
  const setup = (props: Partial<UserProfileProps> = {}) => {
    const initialProps: UserProfileProps = {
      displayName: 'Minjun Kim',
      description: 'Developer @ RIDI',
      profileLinks: {
        github: 'velopert',
        twitter: 'velopert',
        facebook: 'velopert',
        email: 'public.velopert@gmail.com',
      },
      thumbnail: 'https://via.placeholder.com/150',
      username: 'velopert',
    };
    const utils = render(
      <MemoryRouter>
        <UserProfile {...initialProps} {...props} />
      </MemoryRouter>,
    );
    return {
      ...utils,
    };
  };
  it('renders props properly', () => {
    const { getByText, getByTestId, getByAltText } = setup();
    getByText('Minjun Kim');
    getByText('Developer @ RIDI');
    const img = getByAltText('profile') as HTMLImageElement;
    expect(img).toHaveAttribute('src', 'https://via.placeholder.com/150');
    getByTestId('github');
    getByTestId('twitter');
    getByTestId('facebook');
  });
});
