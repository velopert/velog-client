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
const StyledInput = styled.input`
  display: inline-flex;
  outline: none;
  cursor: text;
  font-size: 1.125rem;
  line-height: 2rem;
  margin-bottom: 0.75rem;
  min-width: 8rem;
  border: none;
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
const TagInput: React.FC<TagInputProps> = ({ onChange, tags: initialTags }) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [value, setValue] = useState('');
  const [focus, setFocus] = useState(false);
  const ignore = useRef(false);
  const editableDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tags.length === 0) return;
    onChange(tags);
  }, [tags, onChange]);

  useEffect(() => {
    setTags(initialTags);
  }, [initialTags]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

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
      let processed = tag;
      processed = tag.trim();
      if (processed.indexOf(' #') > 0) {
        const tempTags: string[] = [];
        const regex = /#(\S+)/g;
        let execArray: RegExpExecArray | null = null;
        while ((execArray = regex.exec(processed))) {
          if (execArray !== null) {
            tempTags.push(execArray[1]);
          }
        }
        setTags([...tags, ...tempTags]);
        return;
      }
      if (processed.charAt(0) === '#') {
        processed = processed.slice(1, processed.length);
      }
      setTags([...tags, processed]);
    },
    [tags],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && value === '') {
        setTags(tags.slice(0, tags.length - 1));
        return;
      }
      const keys = [',', 'Enter'];
      if (keys.includes(e.key)) {
        // 등록
        e.preventDefault();
        insertTag(value);
      }
    },
    [insertTag, tags, value],
  );

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
      <StyledInput
        placeholder="태그를 입력하세요"
        tabIndex={2}
        onKeyDown={onKeyDown}
        onChange={onChangeInput}
        value={value}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
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
