import React, { CSSProperties, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import CodeMirror, { EditorFromTextArea, Editor } from 'codemirror';
import './atom-one-light.css';
import 'codemirror/lib/codemirror.css';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/addon/display/placeholder';

const MarkdownEditorBlock = styled.div`
  .CodeMirror {
    height: auto;
    font-size: 1.125rem;
    line-height: 1.5;
    color: ${themedPalette.text1};
    font-family: 'Fira Mono', monospace;
    /* font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', */
    .cm-header {
      line-height: 2;
      color: ${themedPalette.text1};
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
      color: ${themedPalette.text1};
    }
    .CodeMirror-placeholder {
      color: ${themedPalette.text3};
      font-style: italic;
    }
  }
`;

export interface MarkdownEditorProps {
  style?: CSSProperties;
  className?: string;
  onChangeMarkdown: (markdown: string) => void;
  initialMarkdown?: string;
}

const MarkdownEditor = ({
  style,
  className,
  onChangeMarkdown,
  initialMarkdown,
}: MarkdownEditorProps) => {
  const textArea = useRef<HTMLTextAreaElement | null>(null);
  const codemirror = useRef<EditorFromTextArea | null>(null);

  const onChange = useCallback(
    (cm: Editor) => {
      onChangeMarkdown(cm.getValue());
    },
    [onChangeMarkdown],
  );

  // initialize editor
  useEffect(() => {
    if (!textArea.current) return;
    const cm = CodeMirror.fromTextArea(textArea.current, {
      mode: 'markdown',
      theme: 'one-light',
      placeholder: '당신은 어떤 사람인가요? 당신에 대해서 알려주세요.',
      lineWrapping: true,
    });
    codemirror.current = cm;
    cm.focus();
    cm.on('change', onChange);

    if (initialMarkdown) {
      cm.setValue(initialMarkdown);
    }

    return () => {
      cm.toTextArea();
    };
  }, [initialMarkdown, onChange]);

  return (
    <MarkdownEditorBlock style={style} className={className}>
      <textarea ref={textArea} style={{ border: 'none', display: 'none' }} />
    </MarkdownEditorBlock>
  );
};

export default MarkdownEditor;
