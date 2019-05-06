import * as React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import transitions from '../../lib/styles/transitions';

const TagInputBlock = styled.div`
  color: ${palette.gray8};
  font-size: 1.125rem;
  margin-bottom: 4rem;
  display: flex;
  flex-wrap: wrap;
  [contenteditable='true']:empty:before {
    content: attr(placeholder);
    display: block; /* For Firefox */
    color: ${palette.gray5};
  }
`;
const EditableContent = styled.div`
  display: inline-flex;
  outline: none;
  cursor: text;
  font-size: 1.125rem;
  line-height: 2rem;
  margin-bottom: 0.75rem;
  min-width: 8rem;
`;

const Tag = styled.div`
  color: ${palette.gray9};
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  height: 2rem;
  border-radius: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background: ${palette.gray1};
  color: ${palette.teal7};
  margin-right: 0.75rem;
  transition: ease-in 0.125s;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
  margin-bottom: 0.75rem;
  animation: ${transitions.popIn} 0.125s forwards ease-in-out;
`;

export interface TagInputProps {
  ref?: React.RefObject<HTMLDivElement>;
  tags: string[];
  onChange: (tags: string[]) => void;
}

const TagItem: React.FC<{
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ onClick, children }) => {
  return <Tag onClick={onClick}>{children}</Tag>;
};

const Help = styled.div<{ visible: boolean }>`
  display: block;
  width: 100%;
  font-size: 0.875rem;
  color: ${palette.gray7};
  transition: ease-in 0.125s;
  opacity: 0;
  & > .inside {
    margin-top: 0.5rem;
    position: absolute;
  }
  ${props =>
    props.visible &&
    css`
      opacity: 1;
    `}
`;

const { useState, useCallback, useEffect, useRef } = React;
const TagInput: React.FC<TagInputProps> = props => {
  const [tags, setTags] = useState<string[]>([]);
  const [value, setValue] = useState('');
  const [focus, setFocus] = useState(false);
  const ignore = useRef(false);
  const editableDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTags(props.tags);
  }, [props.tags]);

  useEffect(() => {
    if (tags.length === 0) return;
    props.onChange(tags);
  });

  const onChange = useCallback((e: React.ChangeEvent<HTMLDivElement>) => {
    if (ignore.current) {
      ignore.current = false;
      return;
    }

    setValue(e.target.innerText);
  }, []);

  const onPaste = useCallback((e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text');
    document.execCommand('insertText', false, text);
  }, []);

  useEffect(() => {
    if (editableDiv.current) {
      if (value === '') {
        editableDiv.current.innerText = value;
      }
    }
  }, [value]);

  const insertTag = useCallback(
    (tag: string) => {
      ignore.current = true;
      setValue('');
      if (tag === '' || tags.includes(tag)) return;
      setTags([...tags, tag.trim()]);
    },
    [tags],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Backspace' && value === '') {
        setTags(tags.slice(0, tags.length - 1));
        return;
      }
      const keys = [',', 'Enter'];
      if (keys.includes(e.key)) {
        // 등록
        e.preventDefault();
        insertTag(e.currentTarget.innerText);
      }
    },
    [insertTag, tags, value],
  );

  const onFocus = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  const onRemove = (tag: string) => {
    const nextTags = tags.filter(t => t !== tag);
    setTags(nextTags);
  };

  return (
    <TagInputBlock>
      {tags.map(tag => (
        <TagItem key={tag} onClick={() => onRemove(tag)}>
          {tag}
        </TagItem>
      ))}
      <EditableContent
        contentEditable={true}
        placeholder="태그를 입력하세요"
        tabIndex={2}
        onKeyDown={onKeyDown}
        onInput={onChange}
        ref={editableDiv}
        onPaste={onPaste}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <Help visible={focus}>
        <div className="inside">
          쉼표 혹은 엔터를 입력하여 태그를 등록 할 수 있습니다.
          <br />
          등록된 태그를 클릭하면 삭제됩니다.
        </div>
      </Help>
    </TagInputBlock>
  );
};

export default TagInput;
