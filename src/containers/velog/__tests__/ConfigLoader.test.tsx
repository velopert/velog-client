import * as React from 'react';
import ConfigLoader, { ConfigLoaderProps } from '../ConfigLoader';
import { MockedProvider } from '@apollo/react-testing';
import { GET_VELOG_CONFIG } from '../../../lib/graphql/user';
import renderWithRedux from '../../../lib/renderWithRedux';
import waitUntil from '../../../lib/waitUntil';

describe('ConfigLoader', () => {
  const setup = (props: Partial<ConfigLoaderProps> = {}) => {
    const initialProps: Partial<ConfigLoaderProps> & { username: string } = {
      username: 'velopert',
    };
    const mocks = [
      {
        request: {
          query: GET_VELOG_CONFIG,
          variables: {
            username: 'velopert',
          },
        },
        result: {
          data: {
            velog_config: { title: 'VELOPERT.LOG', logo_image: null },
          },
        },
      },
    ];
    const utils = renderWithRedux(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ConfigLoader {...initialProps} {...props} />
      </MockedProvider>,
    );
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    setup();
  });
  it('dispatches SET_VELOG_USERNAME action', () => {
    const { store } = setup();
    expect(store.getState().header.velogUsername).toBe('velopert');
  });
  it('dispatches SET_CUSTOM action', () => {
    const { store, unmount } = setup();
    expect(store.getState().header.custom).toBeTruthy();
    unmount();
    expect(store.getState().header.custom).toBeFalsy();
  });
  it('loads GET_VELOG_CONFIG and dispatches SET_USER_LOGO action', async () => {
    const { store } = setup();
    const userLogo = store.getState().header.userLogo;
    await waitUntil(() => store.getState().header.userLogo !== userLogo);
    expect(store.getState().header.userLogo).toHaveProperty(
      'title',
      'VELOPERT.LOG',
    );
  });
});
