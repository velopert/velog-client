import React from 'react';
import styled from 'styled-components';
import hljs from 'highlight.js';
import Quill, { RangeStatic } from 'quill';
import 'highlight.js/styles/atom-one-dark.css';
import 'quill/dist/quill.snow.css';
import MarkdownShortcuts from '../../lib/quill/markdownShortcuts';
import palette from '../../lib/styles/palette';
import Toolbar from './Toolbar';
import AddLink from './AddLink';
import postStyles from '../../lib/styles/postStyles';
import TitleTextarea from './TitleTextarea';
import { getScrollTop } from '../../lib/utils';

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
  addLinkDefaultValue: string;
  shadow: boolean;
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
    &:not(.ql-blank) {
      p {
        line-height: 1.875;
      }
    }
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

    ul,
    ol {
      padding-left: 0;
      li + li {
        margin-top: 1rem;
      }
      .ql-indent-1 {
        padding-left: 3em !important;
      }
      .ql-indent-2 {
        padding-left: 4.5em !important;
      }
      .ql-indent-3 {
        padding-left: 6em !important;
      }
      .ql-indent-4 {
        padding-left: 7.5em !important;
      }
      .ql-indent-5 {
        padding-left: 9em !important;
      }
      .ql-indent-6 {
        padding-left: 10.5em !important;
      }
      .ql-indent-7 {
        padding-left: 12em !important;
      }
      .ql-indent-8 {
        padding-left: 13.5em !important;
      }
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
    addLinkDefaultValue: '',
    shadow: false,
  };

  handleScroll = () => {
    const { shadow } = this.state;
    const top = getScrollTop();
    const nextShadow = top > 80;
    if (nextShadow !== shadow) {
      this.setState({
        shadow: nextShadow,
      });
    }
  };

  componentDidMount() {
    // bind scroll event
    document.addEventListener('scroll', this.handleScroll);

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
      formats: [
        'bold',
        'header',
        'italic',
        'link',
        'list',
        'blockquote',
        'image',
        'indent',
        'underline',
        'strike',
        'code-block',
      ],
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
              const format = quill.getFormat();
              const defaultValue = format.link || '';
              this.setState({
                addLink: true,
                addLinkPosition: {
                  left: bounds.left,
                  top: bounds.top + bounds.height,
                },
                addLinkDefaultValue: defaultValue,
              });
            },
          },
        },
        syntax: {
          interval: 200,
        },
        clipboard: {
          matchVisual: false, // https://quilljs.com/docs/modules/clipboard/#matchvisual
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

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
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

  handleDeleteLink = () => {
    if (!this.quill) return;
    this.quill.format('link', false);
    this.setState({ addLink: false });
  };

  handleCancelAddLink = () => {
    this.setState({ addLink: false });
  };

  public render() {
    const {
      addLink,
      addLinkPosition,
      titleFocus,
      addLinkDefaultValue,
      shadow,
    } = this.state;
    return (
      <FullPageEditorWrapper>
        <Toolbar visible={!titleFocus} shadow={shadow} mode="WYSIWYG" />
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
              defaultValue={addLinkDefaultValue}
              onConfirm={this.handleAddLink}
              onClose={this.handleCancelAddLink}
              onDelete={this.handleDeleteLink}
            />
          )}
        </Editor>
      </FullPageEditorWrapper>
    );
  }
}
