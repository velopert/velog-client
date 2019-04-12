import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import MarkdownEditor, { MarkdownEditorProps } from '../MarkdownEditor';

describe('MarkdownEditor', () => {
  const setup = (props: Partial<MarkdownEditorProps> = {}) => {
    const initialProps: MarkdownEditorProps = {
      onChangeMarkdown: () => {},
      onChangeTitle: () => {},
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
});
