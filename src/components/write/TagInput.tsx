import * as React from 'react';
import styled from 'styled-components';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import transitions from '../../lib/styles/transitions';
import { mediaQuery } from '../../lib/styles/media';
import { useTransition, animated } from 'react-spring';
import OutsideClickHandler from 'react-outside-click-handler';
import { isEmptyOrWhitespace } from '../../lib/utils';

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

const { useState, useCallback, useEffect, useRef } = React;
const TagInput: React.FC<TagInputProps> = ({ onChange, tags: initialTags }) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [value, setValue] = useState('');
  const [focus, setFocus] = useState(false);
  const ignore = useRef(false);

  useEffect(() => {
    onChange(tags);
  }, [tags, onChange]);

  useEffect(() => {
    setTags(initialTags);
  }, [initialTags]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onOutsideClick = () => {
    if (value === '') return;
    insertTag(value);
  };

  const insertTag = useCallback(
    (tag: string) => {
      ignore.current = true;
      setValue('');
      if (isEmptyOrWhitespace(tag) || tags.includes(tag)) return;
      let processed = tag.trim().slice(0, 255);
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
    const nextTags = tags.filter((t) => t !== tag);
    setTags(nextTags);
  };

  return (
    <OutsideClickHandler onOutsideClick={onOutsideClick}>
      <TagInputBlock>
        {tags.map((tag) => (
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
        <Help focus={focus} />
      </TagInputBlock>
    </OutsideClickHandler>
  );
};

function Help({ focus }: { focus: boolean }) {
  const transitions = useTransition(focus, {
    from: { opacity: 0, transform: 'translateY(-1rem)' },
    enter: { opacity: 1, transform: 'translateY(0rem)' },
    leave: { opacity: 0, transform: 'translateY(-1rem)' },
    config: {
      tension: 350,
      friction: 22,
    },
  });

  return (
    <HelpBlock>
      {transitions((styles, item) =>
        item ? (
          <animated.div className="inside" style={styles}>
            쉼표 혹은 엔터를 입력하여 태그를 등록 할 수 있습니다.
            <br />
            등록된 태그를 클릭하면 삭제됩니다.
          </animated.div>
        ) : null,
      )}
    </HelpBlock>
  );
}

const HelpBlock = styled.div`
  display: block;
  width: 100%;

  color: ${themedPalette.text2};
  transition: ease-in 0.125s;

  & > .inside {
    position: absolute;
    background: ${palette.gray8};
    color: white;
    padding: 0.75rem;
    z-index: 20;
    line-height: 1.5;
    font-size: 0.75rem;
  }
`;

const TagInputBlock = styled.div`
  color: ${themedPalette.text1};
  font-size: 1.125rem;

  display: flex;
  flex-wrap: wrap;
  [contenteditable='true']:empty:before {
    content: attr(placeholder);
    display: block; /* For Firefox */
    color: ${themedPalette.text3};
  }
`;
const StyledInput = styled.input`
  background: transparent;
  display: inline-flex;
  outline: none;
  cursor: text;
  font-size: 1.125rem;
  line-height: 2rem;
  ${mediaQuery(767)} {
    line-height: 1.5rem;
    font-size: 0.75rem;
  }
  margin-bottom: 0.75rem;
  min-width: 8rem;
  border: none;
  color: ${themedPalette.text1};
`;

const Tag = styled.div`
  color: ${themedPalette.text1};
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  height: 2rem;
  border-radius: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background: ${themedPalette.bg_element2};
  color: ${themedPalette.primary1};
  margin-right: 0.75rem;
  transition: ease-in 0.125s;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
  margin-bottom: 0.75rem;
  animation: ${transitions.popIn} 0.125s forwards ease-in-out;
  ${mediaQuery(767)} {
    height: 1.5rem;
    font-size: 0.75rem;
    border-radius: 0.75rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

export default TagInput;
