import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';
import { SearchIcon } from '../../static/svg';
import useToggle from '../../lib/hooks/useToggle';
import useInput from '../../lib/hooks/useInput';

const SearchInputBlock = styled.div<{ focus: boolean }>`
  display: flex;
  height: 2.25rem;
  border: 1px solid ${palette.gray5};
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  align-items: center;
  transition: all 0.125s ease-in;
  cursor: text;
  svg {
    transition: all 0.125s ease-in;
    margin-right: 0.5rem;
    width: 1rem;
    height: 1rem;
    color: ${palette.gray5};
  }
  input {
    transition: all 0.125s ease-in;
    font-size: 0.875rem;
    flex: 1;
    display: block;
    line-height: 1rem;
    height: 1rem;
    padding: 0;
    border: none;
    outline: 0;
    color: ${palette.gray7};
    &::placeholder {
      color: ${palette.gray5};
    }
  }

  ${props =>
    props.focus &&
    css`
      border: 1px solid ${palette.gray8};
      svg {
        color: ${palette.gray9};
      }
      input {
        color: ${palette.gray9};
      }
    `}
`;

export interface SearchInputProps {
  large?: boolean;
  className?: string;
  onSearch: (keyword: string) => void;
}

function SearchInput({ className, onSearch }: SearchInputProps) {
  const [focus, toggleFocus] = useToggle(false);
  const [value, onChange, reset] = useInput('');

  const inputRef = useRef<HTMLInputElement>(null);
  const onClick = () => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  };
  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(value);
      reset();
    }
  };

  return (
    <SearchInputBlock className={className} focus={focus} onClick={onClick}>
      <SearchIcon />
      <input
        placeholder="검색어를 입력하세요"
        onFocus={toggleFocus}
        onBlur={toggleFocus}
        onKeyPress={onKeyPress}
        ref={inputRef}
        onChange={onChange}
        value={value}
      />
    </SearchInputBlock>
  );
}

export default SearchInput;
