import * as React from 'react';
import styled from 'styled-components';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import MarkdownShortcuts from '../../lib/quill/markdownShortcuts';
import TextareaAutosize from 'react-textarea-autosize';
import palette from '../../lib/styles/palette';
import Toolbar from './Toolbar';
import AddLink from './AddLink';

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
      background: ${palette.gray9};
      color: white;
      font-size: 1rem;
      padding: 1rem;
    }
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
    // set focus to title
    if (this.titleTextarea) {
      this.titleTextarea.focus();
    }
    const quill = new Quill(this.editor.current as Element, {
      modules: {
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
              // if (value) {
              //   var href = prompt('링크를 입력하세요.');
              //   quill.format('link', href);
              // } else {
              //   quill.format('link', false);
              // }
            },
          },
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
