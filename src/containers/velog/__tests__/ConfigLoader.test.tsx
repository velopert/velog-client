import * as React from 'react';
import { render } from 'react-testing-library';
import ConfigLoader, { ConfigLoaderProps } from '../ConfigLoader';
import { MockedProvider } from 'react-apollo/test-utils';
import { GET_VELOG_CONFIG } from '../../../lib/graphql/user';

describe('ConfigLoader', () => {
  const setup = (props: Partial<ConfigLoaderProps> = {}) => {
    const initialProps: ConfigLoaderProps = { username: 'velopert' };
    const mocks = [
      {
        request: GET_VELOG_CONFIG,
        variables: {
          name: 'velopert',
        },
        result: {
          data: {
            title: 'VELOPERT.LOG',
            logo_image: null,
          },
        },
      },
    ];
    const utils = render(
      <MockedProvider mocks={mocks}>
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
  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
