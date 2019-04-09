import React from 'react';
import { render } from 'react-testing-library';
import MarkdownEditor, { MarkdownEditorProps } from '../MarkdownEditor';

describe('MarkdownEditor', () => {
  const setup = (props: Partial<MarkdownEditorProps> = {}) => {
    const initialProps: MarkdownEditorProps = {};
    const utils = render(<MarkdownEditor {...initialProps} {...props} />);
    const titleTextarea = utils.getByPlaceholderText('제목을 입력하세요');
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
});
