import * as React from 'react';
import { render, waitForElement } from '@testing-library/react';
import UserProfileContainer, {
  UserProfileContainerProps,
} from '../UserProfileContainer';
import { MockedResponse } from '@apollo/react-testing';
import { GET_USER_PROFILE } from '../../../lib/graphql/user';
import renderWithProviders from '../../../lib/renderWithProviders';

describe('UserProfileContainer', () => {
  const setup = (props: Partial<UserProfileContainerProps> = {}) => {
    const initialProps: UserProfileContainerProps = { username: 'velopert' };
    const mocks: MockedResponse[] = [
      {
        request: {
          query: GET_USER_PROFILE,
          variables: {
            username: 'velopert',
          },
        },
        result: {
          data: {
            user: {
              id: 'c76ccc50-b34d-11e8-b01f-598f1220d1c8',
              username: 'velopert',
              profile: {
                id: 'c7caf1e0-b34d-11e8-b01f-598f1220d1c8',
                display_name: 'Minjun Kim',
                short_bio:
                  'velopert@Laftel Inc. 재미있는것만 골라서 하는 개발자입니다.',
                thumbnail:
                  'https://images.velog.io/profiles/velopert/thumbnails/1536400727.98.png',
                profile_links: {
                  url: 'https://velopert.com/',
                  email: 'public.velopert@gmail.com',
                  github: 'velopert',
                  twitter: 'velopert',
                  facebook: 'velopert',
                },
              },
            },
          },
        },
      },
    ];

    const utils = renderWithProviders(
      <UserProfileContainer {...initialProps} {...props} />,
      { mocks },
    );
    return {
      ...utils,
    };
  };
  it('loads user data', async () => {
    const { getByText } = setup();
    await waitForElement(() => getByText('Minjun Kim'));
  });
});
