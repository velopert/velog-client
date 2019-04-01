import * as React from 'react';
import styled from 'styled-components';
import TitleTextarea from './TitleTextarea';

export interface MarkdownEditorProps {}

const MarkdownEditorBlock = styled.div``;
export default class MarkdownEditor extends React.Component<
  MarkdownEditorProps,
  any
> {
  public render() {
    return (
      <MarkdownEditorBlock>
        <TitleTextarea />
      </MarkdownEditorBlock>
    );
  }
}
