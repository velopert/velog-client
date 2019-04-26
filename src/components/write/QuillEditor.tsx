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
import TitleTextarea from './TitleTextarea';
import { getScrollTop, detectJSDOM, getScrollBottom } from '../../lib/utils';
import convertToMarkdown from '../../lib/convertToMarkdown';
import PopupOKCancel from '../common/PopupOKCancel';

import PopupBase from '../common/PopupBase';
import AskChangeEditor from './AskChangeEditor';
import { WriteMode } from '../../modules/write';
import TagInput from './TagInput';
import zIndexes from '../../lib/styles/zIndexes';

Quill.register('modules/markdownShortcuts', MarkdownShortcuts);

export interface QuillEditorProps {
  onConvertEditorMode: (markdown: string) => void;
  onChangeTitle: (title: string) => void;
  title: string;
  initialHtml: string;

  tagInput: React.ReactNode;
  footer: React.ReactNode;
}
export interface QuillEditorState {
  titleFocus: boolean;
  editorFocus: boolean;
  addLink: boolean;
  addLinkPosition: {
    left: number;
    top: number;
  };
  addLinkDefaultValue: string;
  shadow: boolean;
  askChangeEditor: boolean;
}

const StyledTitleTextarea = styled(TitleTextarea)``;

const QuillEditorWrapper = styled.div`
  padding-top: 5rem;
  padding-bottom: 10rem;
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

const HorizontalBar = styled.div`
  background: ${palette.gray7};
  height: 6px;
  width: 4rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 1px;
`;

const Editor = styled.div`
  margin-top: 1rem;
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

    h1,
    h2,
    h3,
    h4 {
      margin-top: 0.5em;
      margin-bottom: 0.5em;
    }

    p + h1,
    p + h2,
    p + h3,
    p + h4 {
      margin-top: 1em;
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

    p + blockquote {
      margin-top: 1rem;
    }
    blockquote + p {
      margin-bottom: 1rem;
    }
  }
  .ql-editor.ql-blank::before {
    left: 0px;
    color: ${palette.gray5};
  }
`;

const FooterWrapper = styled.div`
  position: fixed;
  z-index: ${zIndexes.WriteFooter};
  left: 0;
  bottom: 0;
  width: 100%;
`;

export default class QuillEditor extends React.Component<
  QuillEditorProps,
  QuillEditorState
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
    askChangeEditor: false,
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

  stickToBottomIfNeeded = () => {
    const scrollBottom = getScrollBottom();
    if (scrollBottom < 192) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  componentDidMount() {
    // bind scroll event
    document.addEventListener('scroll', this.handleScroll);
    if (detectJSDOM()) {
      return;
    }

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
      removeQuote: {
        key: 'enter',
        empty: true,
        format: ['blockquote'],
        handler: (range: RangeStatic, context: any) => {
          quill.format('blockquote', false);
        },
      },
      removeQuoteWithBackspace: {
        key: 'backspace',
        empty: true,
        format: ['blockquote'],
        handler: (range: RangeStatic, context: any) => {
          quill.format('blockquote', false);
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
      this.stickToBottomIfNeeded();
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
        let indentation = getIndent(lastLine);
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

    const { initialHtml } = this.props;
    if (initialHtml) {
      quill.clipboard.dangerouslyPasteHTML(initialHtml);
    }

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
    if ([13].includes(e.keyCode)) {
      e.preventDefault();
      // if (this.quill) {
      //   this.quill.focus();
      // }
    }
  };

  handleAddLink = (value: string) => {
    if (!this.quill) return;
    const scrollTop = getScrollTop();
    this.quill.format('link', value);
    window.scrollTo(0, scrollTop); // Chrome scroll jumping bug
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

  handleAskChangeEditor = () => {
    this.setState({
      askChangeEditor: true,
    });
  };

  handleCancelChangeEditor = () => {
    this.setState({
      askChangeEditor: false,
    });
  };

  handleConfirmChangeEditor = () => {
    this.setState({
      askChangeEditor: false,
    });
    if (detectJSDOM()) {
      this.props.onConvertEditorMode('');
      return;
    }
    if (!this.quill) return;
    const html = this.quill.root.innerHTML;
    const markdown = convertToMarkdown(html);
    this.props.onConvertEditorMode(markdown.replace(/\n\n/g, '\n'));
  };

  handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.props.onChangeTitle(e.target.value);
  };

  public render() {
    const { title, tagInput, footer } = this.props;
    const {
      addLink,
      addLinkPosition,
      titleFocus,
      askChangeEditor,
      addLinkDefaultValue,
      shadow,
    } = this.state;
    return (
      <QuillEditorWrapper data-testid="quill">
        <StyledTitleTextarea
          placeholder="제목을 입력하세요"
          onKeyDown={this.handleTitleKeyDown}
          inputRef={ref => {
            this.titleTextarea = ref;
          }}
          onFocus={this.handleTitleFocus}
          onBlur={this.handleTitleBlur}
          tabIndex={1}
          onChange={this.handleChangeTitle}
          value={title}
        />
        <HorizontalBar />
        {tagInput}
        <Toolbar
          shadow={shadow}
          mode="WYSIWYG"
          onConvert={this.handleAskChangeEditor}
        />
        <Editor>
          <div ref={this.editor} tabIndex={2} />
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
        <AskChangeEditor
          convertTo={WriteMode.MARKDOWN}
          visible={askChangeEditor}
          onCancel={this.handleCancelChangeEditor}
          onConfirm={this.handleConfirmChangeEditor}
        />
        <FooterWrapper>{footer}</FooterWrapper>
      </QuillEditorWrapper>
    );
  }
}
