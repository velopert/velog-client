import * as React from 'react';
import { render } from 'react-testing-library';
import LinkedPostItem, { LinkedPostItemProps } from '../LinkedPostItem';

describe('LinkedPostItem', () => {
  const setup = (props: Partial<LinkedPostItemProps> = {}) => {
    const initialProps: LinkedPostItemProps = {};
    const utils = render(<LinkedPostItem {...initialProps} {...props} />);
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    setup();
  });
});
