import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TagInput, { TagInputProps } from '../TagInput';

describe('TagInput', () => {
  const setup = (props: Partial<TagInputProps> = {}) => {
    const initialProps: TagInputProps = {
      tags: [],
      onChange: () => undefined,
    };
    const utils = render(<TagInput {...initialProps} {...props} />);
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    setup();
  });
  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
  it('shows right tags', () => {
    const utils = setup({
      tags: ['태그1', '태그2'],
    });
    utils.getByText('태그1');
    utils.getByText('태그2');
  });
  /*it('inserts new tag', () => {
    const onChange = jest.fn();
    const utils = setup({
      onChange,
    });
    const editableBlock = utils.getByPlaceholderText('태그를 입력하세요');
    fireEvent.change(editableBlock, {
      target: {
        innerText: '태그1',
      },
    });
    fireEvent.keyDown(editableBlock, {
      key: ',',
    });
    utils.getByText('태그1');
    expect(onChange).toBeCalled();
  });*/
  it('removes tag by click', () => {
    const utils = setup({
      tags: ['지워보세요'],
    });
    const tag = utils.getByText('지워보세요');
    fireEvent.click(tag);
    const removed = utils.queryByText('지워보세요');
    expect(removed).toBeFalsy();
  });
});
