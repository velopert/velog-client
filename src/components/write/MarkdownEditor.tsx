import * as React from 'react';
import styled, { css } from 'styled-components';
import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/dracula.css';
import CodeMirror, { EditorFromTextArea } from 'codemirror';
import TitleTextarea from './TitleTextarea';
require('codemirror/mode/markdown/markdown');
require('codemirror/mode/javascript/javascript');
require('codemirror/addon/display/placeholder');
import './atom-one-light.css';
import palette from '../../lib/styles/palette';
import Toolbar from './Toolbar';
import AddLink from './AddLink';
import { detectJSDOM } from '../../lib/utils';
import AskChangeEditor from './AskChangeEditor';
import { WriteMode } from '../../modules/write';
import TagInput from './TagInput';
import WriteFooter from './WriteFooter';
import zIndexes from '../../lib/styles/zIndexes';

export interface MarkdownEditorProps {
  onChangeMarkdown: (markdown: string) => void;
  onChangeTitle: (title: string) => void;
  onConvert: (markdown: string) => void;
  title: string;
  markdown: string;
  tagInput: React.ReactNode;
  footer: React.ReactNode;
}
type MarkdownEditorState = {
  shadow: boolean;
  addLink: {
    top: number;
    left: number;
    visible: boolean;
    stickToRight: boolean;
  };
  askChangeEditor: boolean;
  clientWidth: number;
};

(window as any).CodeMirror = CodeMirror;
const MarkdownEditorBlock = styled.div`
  height: 100%;
  overflow-y: auto;
  position: relative;
  &::-webkit-scrollbar {
    border-radius: 3px;
    width: 6px;
    &:hover {
      width: 16px;
    }
    background: ${palette.gray1};
  }

  &::-webkit-scrollbar-thumb {
    z-index: 100;
    background: ${palette.gray9};
    /* -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75); */
  }

  & > .wrapper {
    padding-top: 3rem;
    padding-bottom: 10rem;
  }
  .CodeMirror {
    height: auto;
    font-size: 1.3125rem;
    line-height: 1.5;
    color: ${palette.gray8};
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
    .cm-header {
      line-height: 2;
      color: ${palette.gray9};
    }
    .cm-header-1 {
      font-size: 2.5rem;
    }
    .cm-header-2 {
      font-size: 2rem;
    }
    .cm-header-3 {
      font-size: 1.5rem;
    }
    .cm-header-4,
    .cm-header-5,
    .cm-header-6 {
      font-size: 1.3125rem;
    }
    .cm-strong,
    .cm-em {
      color: ${palette.gray9};
    }
    .CodeMirror-placeholder {
      color: ${palette.gray5};
      font-style: italic;
    }
  }
`;

const HorizontalBar = styled.div`
  background: ${palette.gray7};
  height: 6px;
  width: 4rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 1px;
`;

const PaddingWrapper = styled.div`
  padding-left: 3rem;
  padding-right: 3rem;
`;

const FooterWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: ${zIndexes.WriteFooter};
`;
export default class MarkdownEditor extends React.Component<
  MarkdownEditorProps,
  MarkdownEditorState
> {
  block = React.createRef<HTMLDivElement>();
  toolbarElement = React.createRef<HTMLDivElement>();
  editorElement = React.createRef<HTMLTextAreaElement>();
  toolbarTop = 0;
  state = {
    shadow: false,
    addLink: {
      top: 0,
      left: 0,
      visible: false,
      stickToRight: false,
    },
    askChangeEditor: false,
    clientWidth: 0,
  };
  codemirror: EditorFromTextArea | null = null;

  initialize = () => {
    if (!this.editorElement.current) return;

    this.codemirror = CodeMirror.fromTextArea(this.editorElement.current, {
      mode: 'markdown',
      theme: 'one-light',
      placeholder: '당신의 이야기를 적어보세요...',
      viewportMargin: Infinity,
      lineWrapping: true,
    });
    (window as any).codemirror = this.codemirror;
    if (detectJSDOM()) return;
    this.codemirror.setValue(this.props.markdown);
    this.codemirror.on('change', cm => {
      this.props.onChangeMarkdown(cm.getValue());
      this.stickToBottomIfNeeded();
    });
  };

  stickToBottomIfNeeded = () => {
    if (!this.block.current) return;
    const { scrollHeight, scrollTop, clientHeight } = this.block.current;
    const scrollBottom = scrollHeight - scrollTop - clientHeight;
    if (scrollBottom < 192) {
      this.block.current.scrollTo(0, scrollHeight);
    }
  };

  handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { shadow } = this.state;
    const nextShadow = e.currentTarget.scrollTop > this.toolbarTop;
    console.log(e.currentTarget.scrollTop, this.toolbarTop);
    if (shadow !== nextShadow) {
      this.setState({
        shadow: nextShadow,
      });
    }
  };

  handleResize = () => {
    if (this.block.current) {
      this.setState({
        clientWidth: this.block.current.clientWidth,
      });
    }
  };

  componentDidMount() {
    this.initialize();
    setTimeout(() => {
      if (this.toolbarElement.current) {
        this.toolbarTop = this.toolbarElement.current.getBoundingClientRect().top;
      }
    });
    if (this.block.current) {
      this.setState({
        clientWidth: this.block.current.clientWidth,
      });
    }
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleOpenAddLink = () => {
    if (!this.codemirror) return;
    const doc = this.codemirror.getDoc();
    const cursor = doc.getCursor();
    const cursorPos = this.codemirror.cursorCoords(cursor);
    if (!this.block.current) return;
    const stickToRight = cursorPos.left > this.block.current.clientWidth - 341;

    this.setState({
      addLink: {
        visible: true,
        top:
          this.block.current.scrollTop +
          cursorPos.top +
          this.codemirror.defaultTextHeight() / 2 +
          1,
        left: cursorPos.left,
        stickToRight,
      },
    });
  };

  handleConfirmAddLink = (link: string) => {
    // 링크삽입하는 내용
    this.setState({
      addLink: {
        ...this.state.addLink,
        visible: false,
      },
    });
    if (!this.codemirror) return;
    const doc = this.codemirror.getDoc();
    const selection = doc.getSelection();
    const cursor = doc.getCursor('end');
    this.codemirror.focus();
    if (selection.length === 0) {
      doc.replaceSelection(`[링크텍스트](${link})`);
      doc.setSelection(
        {
          line: cursor.line,
          ch: cursor.ch + 1,
        },
        {
          line: cursor.line,
          ch: cursor.ch + 6,
        },
      );
      return;
    }
    doc.replaceSelection(`[${selection}](${link})`);
    doc.setCursor({
      line: cursor.line,
      ch: cursor.ch + link.length + 4,
    });
  };

  handleCancelAddLink = () => {
    this.setState({
      addLink: {
        ...this.state.addLink,
        visible: false,
      },
    });
  };

  handleToolbarClick = (mode: string) => {
    const codemirror = this.codemirror;

    if (!codemirror) return;
    const doc = codemirror.getDoc();

    const cursor = doc.getCursor();
    const selection = {
      start: doc.getCursor('start'),
      end: doc.getCursor('end'),
    };

    const line = doc.getLine(cursor.line);

    const selectWholeLine = () => {
      doc.setSelection(
        {
          line: cursor.line,
          ch: 0,
        },
        {
          line: cursor.line,
          ch: line.length,
        },
      );
    };

    const removeHeading = (text: string) => {
      return text.replace(/#{1,6} /, '');
    };

    const handlers: {
      [key: string]: Function;
    } = {
      ...[1, 2, 3, 4] // creates handlers for heading1, heading2, heading3, heading4
        .map(number => () => {
          // create handler function
          const characters = '#'.repeat(number);
          const plain = removeHeading(line);
          selectWholeLine();
          doc.replaceSelection(`${characters} ${plain}`);
        })
        .reduce((headingHandlers, handler, index) => {
          // reduce into handlers object
          return Object.assign(headingHandlers, {
            [`heading${index + 1}`]: handler,
          });
        }, {}),
      bold: () => {
        const selected = doc.getSelection();
        if (selected === '텍스트') {
          const isBold = /\*\*(.*)\*\*/.test(
            doc.getRange(
              { line: selection.start.line, ch: selection.start.ch - 2 },
              { line: selection.end.line, ch: selection.end.ch + 2 },
            ),
          );

          if (isBold) {
            doc.setSelection(
              { line: selection.start.line, ch: selection.start.ch - 2 },
              { line: selection.end.line, ch: selection.end.ch + 2 },
            );
            doc.replaceSelection('텍스트');
            doc.setSelection(
              { line: selection.start.line, ch: selection.start.ch - 2 },
              { line: selection.end.line, ch: selection.end.ch - 2 },
            );
            return;
          }
        }
        if (/\*\*(.*)\*\*/.test(selected)) {
          // matches **string**
          doc.replaceSelection(selected.replace(/\*\*/g, ''));
          doc.setSelection(
            {
              line: selection.start.line,
              ch: selection.start.ch,
            },
            { line: selection.end.line, ch: selection.end.ch - 4 },
          );
          return;
        }
        if (selected.length > 0) {
          doc.replaceSelection(`**${selected}**`);
          doc.setSelection(
            {
              line: selection.start.line,
              ch: selection.start.ch,
            },
            { line: selection.end.line, ch: selection.end.ch + 4 },
          );
          return;
        }
        doc.replaceSelection('**텍스트**');
        doc.setSelection(
          {
            line: cursor.line,
            ch: cursor.ch + 2,
          },
          {
            line: cursor.line,
            ch: cursor.ch + 5,
          },
        );
      },
      italic: () => {
        let selected = doc.getSelection();

        if (selected.length === 0) {
          doc.replaceSelection(`_텍스트_`);
          doc.setSelection(
            {
              line: cursor.line,
              ch: cursor.ch + 1,
            },
            {
              line: cursor.line,
              ch: cursor.ch + 4,
            },
          );
          return;
        }

        if (selected === '텍스트') {
          const selectLeftAndRight = doc.getRange(
            {
              line: selection.start.line,
              ch: selection.start.ch - 1,
            },
            {
              line: selection.end.line,
              ch: selection.end.ch + 1,
            },
          );
          if (/_(.*)_/.test(selectLeftAndRight)) {
            selected = selectLeftAndRight;
            doc.setSelection(
              {
                line: selection.start.line,
                ch: selection.start.ch - 1,
              },
              {
                line: selection.end.line,
                ch: selection.end.ch + 1,
              },
            );
            selection.start = {
              line: selection.start.line,
              ch: selection.start.ch - 1,
            };
            selection.end = {
              line: selection.end.line,
              ch: selection.end.ch + 1,
            };
          }
        }

        if (/_(.*)_/.test(selected)) {
          const plain = selected
            .replace(/^_/, '') // remove starting _
            .replace(/_$/, ''); // remove ending _
          doc.replaceSelection(plain);
          doc.setSelection(
            {
              line: selection.start.line,
              ch: selection.start.ch,
            },
            { line: selection.end.line, ch: selection.end.ch - 2 },
          );
          return;
        }
        if (selected.length > 0) {
          doc.replaceSelection(`_${selected}_`);
          doc.setSelection(
            {
              line: selection.start.line,
              ch: selection.start.ch,
            },
            { line: selection.end.line, ch: selection.end.ch + 2 },
          );
        }
      },
      strike: () => {
        let selected = doc.getSelection();

        if (selected.length === 0) {
          doc.replaceSelection(`~~텍스트~~`);
          doc.setSelection(
            {
              line: cursor.line,
              ch: cursor.ch + 2,
            },
            {
              line: cursor.line,
              ch: cursor.ch + 5,
            },
          );
          return;
        }

        if (selected === '텍스트') {
          const selectLeftAndRight = doc.getRange(
            {
              line: selection.start.line,
              ch: selection.start.ch - 2,
            },
            {
              line: selection.end.line,
              ch: selection.end.ch + 2,
            },
          );
          if (/~~(.*)~~/.test(selectLeftAndRight)) {
            selected = selectLeftAndRight;
            doc.setSelection(
              {
                line: selection.start.line,
                ch: selection.start.ch - 2,
              },
              {
                line: selection.end.line,
                ch: selection.end.ch + 2,
              },
            );
            selection.start = {
              line: selection.start.line,
              ch: selection.start.ch - 2,
            };
            selection.end = {
              line: selection.end.line,
              ch: selection.end.ch + 2,
            };
          }
        }

        if (/~~(.*)~~/.test(selected)) {
          const plain = selected
            .replace(/^~~/, '') // remove starting ~~
            .replace(/~~$/, ''); // remove ending ~~
          doc.replaceSelection(plain);
          doc.setSelection(
            {
              line: selection.start.line,
              ch: selection.start.ch,
            },
            { line: selection.end.line, ch: selection.end.ch - 4 },
          );
          return;
        }
        if (selected.length > 0) {
          doc.replaceSelection(`~~${selected}~~`);
          doc.setSelection(
            {
              line: selection.start.line,
              ch: selection.start.ch,
            },
            { line: selection.end.line, ch: selection.end.ch + 4 },
          );
        }
      },
      blockquote: () => {
        const matches = /^> /.test(line);
        doc.setSelection(
          { line: cursor.line, ch: 0 },
          { line: cursor.line, ch: line.length },
        );
        if (matches) {
          doc.replaceSelection(line.replace(/^> /, ''));
          doc.setCursor({
            line: cursor.line,
            ch: cursor.ch - 2,
          });
        } else {
          doc.replaceSelection(`> ${line}`);
          doc.setCursor({
            line: cursor.line,
            ch: cursor.ch + 2,
          });
        }
      },
      link: () => {
        this.handleOpenAddLink();
      },
      codeblock: () => {
        const selected = doc.getSelection();
        if (selected.length === 0) {
          doc.replaceSelection('```\n코드를 입력하세요\n```');
          doc.setSelection(
            {
              line: cursor.line + 1,
              ch: 0,
            },
            {
              line: cursor.line + 1,
              ch: 9,
            },
          );
          return;
        }
        doc.replaceSelection(`\`\`\`
${selected}
\`\`\``);
      },
    };

    const handler = handlers[mode];
    if (!handler) return;

    handler();
    codemirror.focus();
  };

  handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.props.onChangeTitle(e.target.value);
  };

  handleAskConvert = () => {
    this.setState({
      askChangeEditor: true,
    });
  };

  handleConfirmConvert = () => {
    this.setState({
      askChangeEditor: false,
    });
    if (!this.codemirror) return;
    const markdown = this.codemirror.getValue();
    this.props.onConvert(markdown);
  };

  handleCancelConvert = () => {
    this.setState({
      askChangeEditor: false,
    });
  };

  public render() {
    const { shadow, addLink, clientWidth } = this.state;
    const { title, tagInput, footer } = this.props;
    return (
      <MarkdownEditorBlock
        ref={this.block}
        onScroll={this.handleScroll}
        data-testid="codemirror"
      >
        <div className="wrapper">
          <PaddingWrapper>
            <TitleTextarea
              placeholder="제목을 입력하세요"
              onChange={this.handleTitleChange}
              value={title}
            />
            <HorizontalBar />
            {tagInput}
          </PaddingWrapper>
          <Toolbar
            shadow={shadow}
            mode="MARKDOWN"
            onClick={this.handleToolbarClick}
            onConvert={this.handleAskConvert}
            innerRef={this.toolbarElement}
          />
          <PaddingWrapper>
            {addLink.visible && (
              <AddLink
                defaultValue=""
                left={addLink.left}
                top={addLink.top}
                stickToRight={addLink.stickToRight}
                onConfirm={this.handleConfirmAddLink}
                onClose={this.handleCancelAddLink}
              />
            )}
            <textarea id="bla" ref={this.editorElement} />
          </PaddingWrapper>
        </div>
        <AskChangeEditor
          visible={this.state.askChangeEditor}
          onConfirm={this.handleConfirmConvert}
          onCancel={this.handleCancelConvert}
          convertTo={WriteMode.WYSIWYG}
        />
        <FooterWrapper style={{ width: clientWidth }}>{footer}</FooterWrapper>
      </MarkdownEditorBlock>
    );
  }
}
