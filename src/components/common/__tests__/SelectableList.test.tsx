import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SelectableList, { SelectableListProps } from '../SelectableList';

describe('SelectableList', () => {
  const setup = (props: Partial<SelectableListProps> = {}) => {
    const initialProps: SelectableListProps = {
      list: [
        {
          id: 1,
          text: '아이템 #1',
        },
        {
          id: 2,
          text: '아이템 #2',
        },
      ],
      selectedId: 1,
      onChangeId: () => {},
    };
    const utils = render(<SelectableList {...initialProps} {...props} />);
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    const { getByText } = setup();
    getByText('아이템 #1');
    getByText('아이템 #2');
  });
  it('calls onChangeId', () => {
    const onChangeId = jest.fn();
    const { getByText } = setup({ onChangeId });
    fireEvent.click(getByText('아이템 #2'));
    expect(onChangeId).toBeCalledWith(2);
  });
  it('shows active style', () => {
    const { getByText } = setup();
    const activeItem = getByText('아이템 #1');
    expect(activeItem).toHaveStyle('background: rgb(18, 184, 134);');
  });
});
