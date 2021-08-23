import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MarkdownEditor, {
  escapeRegExp,
  hasSurroundedWith,
  MarkdownEditorProps,
  remove,
  surround,
  toggle,
} from '../WriteMarkdownEditor';

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
  });
  it('uses title prop', () => {
    const utils = setup({
      title: 'hello world',
    });
    expect(utils.titleTextarea.value).toBe('hello world');
  });
});

describe('MarkdownEditor: keymap', () => {
  test('escapeRegExp: 문자열에 포함된 정규표현식 상 모든 특수문자를 escape한다', () => {
    `.*+?$^{}()|[]\\`
      .split('')
      .forEach((ch) => expect(escapeRegExp(ch)).toBe(`\\${ch}`));
  });

  test('hasSurroundedWith: char로 둘러싸인 문자열이 하나라도 포함되어 있으면 true를 반환한다', () => {
    expect(hasSurroundedWith('**', 'abc**dd')).toBe(false);
    expect(hasSurroundedWith('**', '*abc**dd*')).toBe(false);

    expect(hasSurroundedWith('**', 'abc**dd**ee')).toBe(true);
    expect(hasSurroundedWith('**', '**dd**')).toBe(true);
    expect(hasSurroundedWith('**', '****')).toBe(true);
    expect(hasSurroundedWith('_', 'a_b_cdd_e_e')).toBe(true);
    expect(hasSurroundedWith('~~', '무~~야호~~b~~cd~~def')).toBe(true);
  });

  test('surround: 문자열의 앞과 뒤를 char로 감싼 문자열을 반환한다', () => {
    expect(surround('**', 'abcdd')).toBe('**abcdd**');
    expect(surround('_', 'abcddee')).toBe('_abcddee_');
    expect(surround('~~', '')).toBe('~~~~');
  });

  test('remove: 문자열 내 포함된 char를 모두 제거한다', () => {
    expect(remove('**', 'abc**dd')).toBe('abcdd');
    expect(remove('_', 'a_b_cdd_e_e')).toBe('abcddee');
    expect(remove('~~', '~~~~')).toBe('');
  });

  test('toggle: char로 둘러싸인 문자열이 하나라도 포함되어 있으면, 문자열 내 포함된 char를 모두 제거한다. 그렇지 않으면 문자열의 앞과 뒤를 char로 감싼 문자열을 반환한다', () => {
    expect(toggle('**', 'abc**dd**')).toBe('abcdd');
    expect(toggle('_', 'abcddee')).toBe('_abcddee_');
    expect(toggle('~~', '')).toBe('~~~~');
  });
});
