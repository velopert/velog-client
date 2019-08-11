import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Toolbar, { ToolbarProps } from '../Toolbar';

describe('Toolbar', () => {
  const setup = (props: Partial<ToolbarProps> = {}) => {
    const initialProps: ToolbarProps = {
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
  it('calls onConvert in markdown mode', () => {
    const onConvert = jest.fn();
    const { getByTestId } = setup({
      onConvert,
    });
    const convertButton = getByTestId('quillconvert');
    fireEvent.click(convertButton);
    expect(onConvert).toBeCalled();
  });
  it('calls onConvert in markdown mode', () => {
    const onConvert = jest.fn();
    const { getByTestId } = setup({
      mode: 'WYSIWYG',
      onConvert,
    });
    const convertButton = getByTestId('mdconvert');
    fireEvent.click(convertButton);
    expect(onConvert).toBeCalled();
  });
});
