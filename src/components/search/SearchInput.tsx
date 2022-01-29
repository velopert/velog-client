import React, { useRef, useMemo, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { themedPalette } from '../../lib/styles/themes';
import palette from '../../lib/styles/palette';
import { SearchIcon2 } from '../../static/svg';
import useToggle from '../../lib/hooks/useToggle';
import useInput from '../../lib/hooks/useInput';
import { debounce } from 'throttle-debounce';
import media from '../../lib/styles/media';

const SearchInputBlock = styled.div<{ focus: boolean; large?: boolean }>`
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
    fill: ${palette.gray5};
    flex-shrink: 0;
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
    color: ${themedPalette.text2};
    min-width: 0;
    &::placeholder {
      color: ${themedPalette.text3};
    }
  }

  ${(props) =>
    props.focus &&
    css`
      border: 1px solid ${palette.gray8};
      svg {
        fill: ${palette.gray9};
      }
      input {
        color: ${themedPalette.text1};
      }
    `}

  ${(props) =>
    props.large &&
    css`
      height: 4rem;
      padding: 0 1.5rem;
      svg {
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 1.25rem;
      }
      input {
        font-size: 1.5rem;
        line-height: 2rem;
        height: 2rem;
      }
      ${media.small} {
        height: 2.25rem;
        padding-left: 1rem;
        padding-right: 1rem;
        svg {
          width: 1rem;
          height: 1rem;
          margin-right: 0.75rem;
        }
        input {
          flex: 1;
          font-size: 1.125rem;
          line-height: 1.5;
          height: auto;
        }
      }
    `}
`;

export interface SearchInputProps {
  large?: boolean;
  className?: string;
  onSearch: (keyword: string) => void;
  initial: string;
  searchAsYouType?: boolean;
}

function SearchInput({
  className,
  onSearch,
  initial,
  large,
  searchAsYouType,
}: SearchInputProps) {
  const [focus, toggleFocus] = useToggle(false);
  const [value, onChange] = useInput(initial);
  const mounted = useRef(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = useMemo(() => {
    return debounce(300, (keyword: string) => {
      onSearch(keyword);
    });
  }, [onSearch]);

  const onClick = () => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  };
  const onKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(value);
    }
  };

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (searchAsYouType) {
      debouncedSearch(value);
    }
  }, [debouncedSearch, searchAsYouType, value]);

  return (
    <SearchInputBlock
      className={className}
      focus={focus}
      onClick={onClick}
      large={large}
    >
      <SearchIcon2 />
      <input
        placeholder="검색어를 입력하세요"
        onFocus={toggleFocus}
        onBlur={toggleFocus}
        onKeyPress={onKeyPress}
        ref={inputRef}
        onChange={onChange}
        value={value}
        autoFocus
      />
    </SearchInputBlock>
  );
}

SearchInput.defaultProps = {
  initial: '',
};

export default SearchInput;
