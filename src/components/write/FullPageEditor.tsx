import * as React from 'react';
import styled from 'styled-components';
import hljs from 'highlight.js';
import Quill, { RangeStatic } from 'quill';
import 'highlight.js/styles/atom-one-dark.css';
import 'quill/dist/quill.snow.css';
import MarkdownShortcuts from '../../lib/quill/markdownShortcuts';
import TextareaAutosize from 'react-textarea-autosize';
import palette from '../../lib/styles/palette';
import Toolbar from './Toolbar';
import AddLink from './AddLink';
import postStyles from '../../lib/styles/postStyles';

Quill.register('modules/markdownShortcuts', MarkdownShortcuts);

export interface FullPageEditorProps {}
export interface FullPageEditorState {
  titleFocus: boolean;
  editorFocus: boolean;
  addLink: boolean;
  addLinkPosition: {
    left: number;
    top: number;
  };
}

const FullPageEditorWrapper = styled.div`
  padding-top: 1.5rem;
  position: relative;
  /* display: flex;
  flex-direction: column;
  height: 100%;

  .ql-container {
    height: initial;
    flex: 1;
    overflow-y: auto;
  } */

  width: 768px;
  margin: 0 auto;
`;

const TitleTextarea = styled(TextareaAutosize)`
  padding: 0;
  font-size: 2.5rem;
  width: 100%;
  resize: none;
  line-height: 1.5;
  outline: none;
  border: none;
  font-weight: bold;
  color: ${palette.gray9};
  &::placeholder {
    color: ${palette.gray5};
  }
`;

const Editor = styled.div`
  margin-top: 2rem;
  position: relative;
  .ql-container {
    font-family: inherit;
  }
  .ql-editor {
    padding: 0;
    font-size: 1.3125rem;
    font-family: inherit;
    line-height: 1.875;
    color: ${palette.gray9};
    .ql-syntax {
      margin-top: 2rem;
      margin-bottom: 2rem;
      background: ${palette.gray8};
      color: white;
      font-size: 1rem;
      padding: 1rem;
      font-family: 'Fira Mono', monospace;
      border-radius: 8px;
      overflow-x: auto;
    }

    ${postStyles}
  }
  .ql-editor.ql-blank::before {
    left: 0px;
    color: ${palette.gray5};
  }
`;

export default class FullPageEditor extends React.Component<
  FullPageEditorProps,
  FullPageEditorState
> {
  editor = React.createRef<HTMLDivElement>();
  titleTextarea: HTMLTextAreaElement | null = null;
  quill: Quill | null = null;

  state = {
    titleFocus: false,
    editorFocus: false,
    addLink: false,
    addLinkPosition: {
      top: 0,
      left: 0,
    },
  };
  componentDidMount() {
    // setup highlight.js
    if (!(window as any).HLJS_CONFIGURED) {
      (window as any).HLJS_CONFIGURED = true;
      hljs.configure({
        languages: ['javascript', 'python'],
      });
    }

    // set focus to title
    if (this.titleTextarea) {
      this.titleTextarea.focus();
    }

    // keyboard bindings
    const bindings = {
      // autoindent: {
      //   key: 'enter',
      //   handler: (range: RangeStatic, context: any) => {
      //     console.log(range);
      //     const lastNewLineIndex = quill
      //       .getText()
      //       .lastIndexOf('\n', range.index - 1);
      //     const lastLine = quill.getText(
      //       lastNewLineIndex + 1,
      //       range.index - lastNewLineIndex,
      //     );
      //     console.log(lastLine);
      //     // quill.insertText(range.index, '\n');
      //   },
      // },
      removeCodeBlock: {
        key: 'backspace',
        empty: true,
        format: ['code-block'],
        handler: (range: RangeStatic, context: any) => {
          quill.format('code-block', false);
        },
      },
    };

    const quill = new Quill(this.editor.current as Element, {
      modules: {
        keyboard: {
          bindings,
        },
        markdownShortcuts: {},
        toolbar: {
          container: '#toolbar',
          handlers: {
            link: (value: string) => {
              const range = quill.getSelection();
              if (!range) return;
              const bounds = quill.getBounds(range.index);
              this.setState({
                addLink: true,
                addLinkPosition: {
                  left: bounds.left,
                  top: bounds.top + bounds.height,
                },
              });
            },
          },
        },
        syntax: {
          interval: 200,
        },
      },
      placeholder: '당신의 이야기를 적어보세요...',
    });

    this.quill = quill;

    (window as any).quill = quill;

    // handle blur and focus
    quill.on('selection-change', (range, oldRange, source) => {
      if (range === null && oldRange !== null) {
        this.setState({
          editorFocus: false,
        });
      }
      if (range !== null && oldRange === null) {
        this.setState({
          editorFocus: true,
        });
      }
    });
    const getIndent = (text: string) => text.length - text.trimLeft().length;

    const onEnter = () => {
      // handle keep-indent
      const text = quill.getText();
      const selection = quill.getSelection();
      if (!selection) return;
      const lastLineBreakIndex = text.lastIndexOf('\n', selection.index - 1);
      const lastLine = text.substr(
        lastLineBreakIndex + 1,
        selection.index - lastLineBreakIndex - 1,
      );
      const format = quill.getFormat(
        lastLineBreakIndex + 1,
        selection.index - lastLineBreakIndex - 1,
      );

      // indent
      if (format['code-block']) {
        console.log(`"${lastLine}"`);
        let indentation = getIndent(lastLine);
        console.log(indentation);
        const shouldExtraIndent = (() => {
          return /\)\:$/.test(lastLine) || /\)? ?{$/.test(lastLine);
        })();
        if (shouldExtraIndent) {
          indentation += 2;
        }
        if (indentation === 0) return;
        const spaces = ' '.repeat(indentation);
        if (lastLine === '\n') return;
        console.log(lastLine);
        quill.insertText(selection.index + 1, spaces);
        setTimeout(() => {
          quill.setSelection(selection.index + 1 + indentation, 0);
        });
      }
    };
    quill.on('text-change', (delta, oldContents, source) => {
      const lastOps = delta.ops[delta.ops.length - 1];
      if (lastOps) {
        if (lastOps.insert === '\n') {
          onEnter();
        }
      }
    });

    // quill.keyboard.addBinding(
    //   { key: 'backspace' },

    //   (range, context) => {
    //     console.log(range);
    //     quill.deleteText(range.index - 1, 1);
    //   },
    // );
  }

  handleTitleFocus = () => {
    this.setState({
      titleFocus: true,
    });
  };

  handleTitleBlur = () => {
    this.setState({
      titleFocus: false,
    });
  };

  // blocks [Enter] key
  handleTitleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (this.quill) {
        this.quill.focus();
      }
    }
  };

  handleAddLink = (value: string) => {
    if (!this.quill) return;
    this.quill.format('link', value);
    this.setState({
      addLink: false,
    });
  };

  handleCancelAddLink = () => {
    this.setState({ addLink: false });
  };

  public render() {
    const { addLink, addLinkPosition, titleFocus } = this.state;
    return (
      <FullPageEditorWrapper>
        <Toolbar visible={!titleFocus} />
        <TitleTextarea
          placeholder="제목을 입력하세요"
          onKeyDown={this.handleTitleKeyDown}
          inputRef={ref => {
            this.titleTextarea = ref;
          }}
          onFocus={this.handleTitleFocus}
          onBlur={this.handleTitleBlur}
        />
        <Editor>
          <div ref={this.editor} />
          {addLink && (
            <AddLink
              {...addLinkPosition}
              onConfirm={this.handleAddLink}
              onClose={this.handleCancelAddLink}
            />
          )}
        </Editor>
      </FullPageEditorWrapper>
    );
  }
}
