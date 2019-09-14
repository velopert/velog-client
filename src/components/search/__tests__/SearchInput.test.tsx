import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchInput, { SearchInputProps } from '../SearchInput';

describe('SearchInput', () => {
  const setup = (props: Partial<SearchInputProps> = {}) => {
    const initialProps: SearchInputProps = {
      onSearch: () => {},
    };
    const utils = render(<SearchInput {...initialProps} {...props} />);
    return {
      ...utils,
    };
  };

  it('calls onSearch', () => {
    const onSearch = jest.fn();
    const { getByPlaceholderText } = setup({ onSearch });
    const input = getByPlaceholderText('검색어를 입력하세요');
    fireEvent.change(input, {
      target: {
        value: 'Hello World',
      },
    });
    expect(input).toHaveAttribute('value', 'Hello World');
    fireEvent.keyPress(input, {
      key: 'Enter',
      code: 13,
      charCode: 13,
    });
    expect(onSearch).toBeCalledWith('Hello World');
  });
});
