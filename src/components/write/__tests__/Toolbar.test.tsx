import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import Toolbar, { ToolbarProps } from '../Toolbar';

describe('Toolbar', () => {
  const setup = (props: Partial<ToolbarProps> = {}) => {
    const initialProps: ToolbarProps = {
      visible: true,
      shadow: false,
      mode: 'MARKDOWN',
      onClick: () => {},
    };
    const utils = render(<Toolbar {...initialProps} {...props} />);
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
  it('onClick works', () => {
    const onClick = jest.fn();
    const utils = setup({
      onClick,
    });
    const headers = utils.container.querySelectorAll('.ql-header');
    expect(headers.length).toBe(4);
    const heading1 = headers[0];
    fireEvent.click(heading1);
    expect(onClick).toBeCalledWith('heading1');
  });
});
