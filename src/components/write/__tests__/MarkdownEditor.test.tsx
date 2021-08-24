import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MarkdownEditor, {
  escapeRegExp,
  fallbackString,
  generateTextFormatter,
  hasSurroundedWith,
  MarkdownEditorProps,
  remove,
  surround,
  toggle,
} from '../WriteMarkdownEditor';
import CodeMirror from 'codemirror';

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

describe('MarkdownEditor: TextFormatter', () => {
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

  test('hasSurroundedWith: 문자열이 multiline 인 경우에도 정상 작동한다', () => {
    expect(hasSurroundedWith('**', 'a\nbc**d\nd')).toBe(false);
    expect(hasSurroundedWith('**', '*a\nbc**dd*')).toBe(false);

    expect(hasSurroundedWith('**', 'abc**\ndd**\nee')).toBe(true);
    expect(hasSurroundedWith('**', '\n**d\nd**')).toBe(true);
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

  describe('generateTextFormatter', () => {
    const setup = (char: string) => {
      document.body.createTextRange = () => ({
        setEnd: () => {},
        setStart: () => {},
        getBoundingClientRect: () => {},
        getClientRects: () => [],
      });

      const textarea = document.createElement('textarea');
      document.body.append(textarea);

      const codemirror = CodeMirror.fromTextArea(textarea, {
        mode: 'markdown',
        theme: 'one-light',
        placeholder: '당신의 이야기를 적어보세요...',
        lineWrapping: true,
      });

      const textFormatter = generateTextFormatter(char);

      return { codemirror, textFormatter };
    };

    test('아무 문자열도 선택되지 않았을 때 ', () => {
      const boldChar = '**';

      const { textFormatter, codemirror } = setup(boldChar);

      expect(codemirror.getValue()).toBe('');
      expect(codemirror.getSelection()).toBe('');
      expect(codemirror.somethingSelected()).toBe(false);

      // bold button has been clicked or Ctrl-B pressed
      textFormatter(codemirror);

      expect(codemirror.getSelection()).toBe(fallbackString);
      expect(codemirror.getValue()).toBe(boldChar + fallbackString + boldChar);

      // bold button has been clicked or Ctrl-B pressed again
      textFormatter(codemirror);

      expect(codemirror.getSelection()).toBe(fallbackString);
      expect(codemirror.getValue()).toBe(fallbackString);
    });

    test('선택된 문자열이 특수기호(** 등)를 포함한 경우: 한 번 누를 경우 포함된 모든 특수기호를 제거하며, 두 번 누를 경우 처음과 끝에 특수기호를 추가한다', () => {
      const boldChar = '**';
      const initialValue = 'already **bold** word';

      const { textFormatter, codemirror } = setup(boldChar);

      codemirror.setValue(initialValue);
      codemirror.setSelection(
        { line: 0, ch: 0 },
        { line: 0, ch: initialValue.length },
      );

      expect(codemirror.getValue()).toBe(initialValue);
      expect(codemirror.getSelection()).toBe(initialValue);

      // bold button has been clicked or Ctrl-B pressed
      textFormatter(codemirror);

      const unboldValue = 'already bold word';

      expect(codemirror.getSelection()).toBe(unboldValue);
      expect(codemirror.getValue()).toBe(unboldValue);

      // bold button has been clicked or Ctrl-B pressed again
      textFormatter(codemirror);

      const boldValue = '**already bold word**';

      expect(codemirror.getSelection()).toBe(boldValue);
      expect(codemirror.getValue()).toBe(boldValue);
    });

    test('선택된 문자열이 특수기호(** 등)를 포함하지 않은 경우: 한 번 누를 경우 처음과 끝에 특수기호를 추가하며, 두 번 누를 경우 포함된 모든 특수기호를 제거한다, ', () => {
      const boldChar = '**';
      const initialValue = 'initial bold word';

      const { textFormatter, codemirror } = setup(boldChar);

      codemirror.setValue(initialValue);
      codemirror.setSelection(
        { line: 0, ch: 'initial '.length },
        { line: 0, ch: 'initial bold'.length },
      );

      expect(codemirror.getValue()).toBe(initialValue);
      expect(codemirror.getSelection()).toBe('bold');

      // bold button has been clicked or Ctrl-B pressed
      textFormatter(codemirror);

      const boldValue = 'initial **bold** word';

      expect(codemirror.getSelection()).toBe('**bold**');
      expect(codemirror.getValue()).toBe(boldValue);

      // bold button has been clicked or Ctrl-B pressed again
      textFormatter(codemirror);

      const unboldValue = 'initial bold word';

      expect(codemirror.getSelection()).toBe('bold');
      expect(codemirror.getValue()).toBe(unboldValue);
    });
  });
});
