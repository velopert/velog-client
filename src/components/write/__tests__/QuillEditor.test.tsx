import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import QuillEditor, { QuillEditorProps } from '../QuillEditor';

describe('QuillEditor', () => {
  const setup = (props: Partial<QuillEditorProps> = {}) => {
    const initialProps: QuillEditorProps = {
      onConvertEditorMode: () => undefined,
    };
    const utils = render(<QuillEditor {...initialProps} {...props} />);
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    setup();
  });
  it('matches snapshot', () => {
    const { container } = setup({});
    expect(container).toMatchSnapshot();
  });
  it('calls onConvertEditorMode', async () => {
    const onConvertEditorMode = jest.fn();
    const { getByTestId, getByText } = setup({
      onConvertEditorMode,
    });
    const convertButton = getByTestId('mdconvert');
    fireEvent.click(convertButton);
    const confirmButton = getByText('확인');
    fireEvent.click(confirmButton);
    expect(onConvertEditorMode).toBeCalled();
  });
});
