import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PopupOKCancel, { PopupOKCancelProps } from '../PopupOKCancel';

describe('PopupOKCancel', () => {
  const setup = (props: Partial<PopupOKCancelProps> = {}) => {
    const initialProps: PopupOKCancelProps = {
      visible: true,
      title: '제목',
      children: '내용',
    };
    const utils = render(<PopupOKCancel {...initialProps} {...props} />);
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    const utils = setup();
    utils.getByText('제목');
    utils.getByText('내용');
  });
  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
  describe('visible property works properly', () => {
    it('false', () => {
      const utils = setup({ visible: false });
      const title = utils.queryByText('제목');
      expect(title).toBe(null);
    });
    it('true', () => {
      const utils = setup({ visible: true });
      utils.getByText('제목');
    });
  });
  it('button works properly', () => {
    const [onConfirm, onCancel] = [jest.fn(), jest.fn()];
    const utils = setup({
      onConfirm,
      onCancel,
    });
    const confirm = utils.getByText('확인');
    const cancel = utils.getByText('취소');
    fireEvent.click(confirm);
    expect(onConfirm).toBeCalled();
    fireEvent.click(cancel);
    expect(onCancel).toBeCalled();
  });
});
