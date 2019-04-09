import React from 'react';
import { render } from 'react-testing-library';
import HeaderUserIcon, { HeaderUserIconProps } from '../HeaderUserIcon';

describe('HeaderUserIcon', () => {
  const setup = (props: Partial<HeaderUserIconProps> = {}) => {
    const initialProps: HeaderUserIconProps = {
      user: {
        id: '',
        username: 'tester',
        profile: {
          thumbnail: '',
          display_name: 'tester kim',
        },
      },
    };
    const utils = render(<HeaderUserIcon {...initialProps} {...props} />);
    return utils;
  };
  it('renders properly', () => {
    setup();
  });
  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
