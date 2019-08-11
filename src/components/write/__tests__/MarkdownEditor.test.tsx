import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MarkdownEditor, { MarkdownEditorProps } from '../MarkdownEditor';

describe('MarkdownEditor', () => {
  const setup = (props: Partial<MarkdownEditorProps> = {}) => {
    const initialProps: MarkdownEditorProps = {
      onChangeMarkdown: () => {},
      onChangeTitle: () => {},
      onConvert: (markdown: string) => {},
      markdown: '',
      title: '',
    };
    const utils = render(<MarkdownEditor {...initialProps} {...props} />);
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
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
  it('has codemirror editor', () => {
    const utils = setup();
    utils.getByText('당신의 이야기를 적어보세요...');
  });
  it('changes title properly', () => {
    const onChangeTitle = jest.fn();
    const utils = setup({
      onChangeTitle,
    });
    fireEvent.change(utils.titleTextarea, {
      target: {
        value: 'changed',
      },
    });
    expect(onChangeTitle).toBeCalledWith('changed');
    // expect(utils.titleTextarea.value).toBe('changed!');
  });
  it('uses title prop', () => {
    const utils = setup({
      title: 'hello world',
    });
    expect(utils.titleTextarea.value).toBe('hello world');
  });

  it('convert editor', () => {
    const onConvert = jest.fn();
    const { getByTestId, getByText } = setup({
      onConvert,
    });
    const convertButton = getByTestId('quillconvert');
    fireEvent.click(convertButton);
    getByText('쉬운 에디터로 전환');
    const confirmButton = getByText('확인');
    fireEvent.click(confirmButton);
    expect(onConvert).toBeCalled();
  });
});
