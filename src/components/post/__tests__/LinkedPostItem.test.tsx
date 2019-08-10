import * as React from 'react';
import { render } from 'react-testing-library';
import LinkedPostItem, { LinkedPostItemProps } from '../LinkedPostItem';
import { MemoryRouter } from 'react-router';

describe('LinkedPostItem', () => {
  const setup = (props: Partial<LinkedPostItemProps> = {}) => {
    const initialProps: LinkedPostItemProps = { linkedPost: null };
    const utils = render(
      <MemoryRouter>
        <LinkedPostItem {...initialProps} {...props} />
      </MemoryRouter>,
    );
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    setup();
  });
});
