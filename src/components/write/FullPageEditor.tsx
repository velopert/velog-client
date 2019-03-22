import * as React from 'react';
import styled from 'styled-components';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import MarkdownShortcuts from '../../lib/quill/markdownShortcuts';
import TextareaAutosize from 'react-textarea-autosize';
import palette from '../../lib/styles/palette';

Quill.register('modules/markdownShortcuts', MarkdownShortcuts);

export interface FullPageEditorProps {}

const FullPageEditorWrapper = styled.div`
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
  padding-top: 6rem;
`;

const TitleTextarea = styled(TextareaAutosize)`
  font-size: 2.5rem;
  font-family: 'Nanum Myeongjo', serif;
  width: 100%;
  resize: none;
  line-height: 1.5;
  outline: none;
  border: none;
  font-weight: bold;
`;

const Editor = styled.div`
  margin-top: 3rem;
  .ql-editor {
    padding: 0;
    font-size: 1.3125rem;
    font-family: 'Nanum Myeongjo', serif;
    line-height: 1.875;
    .ql-syntax {
      background: ${palette.gray9};
      color: white;
    }
  }
`;

export default class FullPageEditor extends React.Component<
  FullPageEditorProps,
  any
> {
  editor = React.createRef<HTMLDivElement>();

  componentDidMount() {
    const quill = new Quill(this.editor.current as Element, {
      modules: {
        markdownShortcuts: {},
      },
    });
  }

  // blocks [Enter] key
  handleTitleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  public render() {
    return (
      <FullPageEditorWrapper>
        <TitleTextarea
          placeholder="제목을 입력하세요"
          onKeyDown={this.handleTitleKeyDown}
        />
        <div id="#toolbar" />
        <Editor>
          <div ref={this.editor} />
        </Editor>
      </FullPageEditorWrapper>
    );
  }
}
