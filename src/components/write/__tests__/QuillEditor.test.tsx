import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import QuillEditor, { QuillEditorProps } from '../QuillEditor';

describe('QuillEditor', () => {
  const setup = (props: Partial<QuillEditorProps> = {}) => {
    const initialProps: QuillEditorProps = {
      onConvertEditorMode: () => undefined,
      onChangeTitle: () => undefined,
      title: '',
      initialHtml: '',
      tagInput: <div>tagInput</div>,
      footer: <div>footer</div>,
    };
    const utils = render(<QuillEditor {...initialProps} {...props} />);
    const titleTextarea = utils.getByPlaceholderText(
      '제목을 입력하세요',
    ) as HTMLTextAreaElement;
    return {
      titleTextarea,
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
  it('renders tagInput and footer', () => {
    const { getByText } = setup();
    getByText('footer');
    getByText('tagInput');
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
  it('shows the title props', () => {
    const { titleTextarea } = setup({
      title: 'Hi there!',
    });
    expect(titleTextarea.value).toBe('Hi there!');
  });
  it('changes title textarea', () => {
    const onChangeTitle = jest.fn();
    const { titleTextarea } = setup({
      onChangeTitle,
    });
    fireEvent.change(titleTextarea, {
      target: {
        value: '안녕하세요',
      },
    });
    expect(onChangeTitle).toBeCalledWith('안녕하세요');
  });
});
