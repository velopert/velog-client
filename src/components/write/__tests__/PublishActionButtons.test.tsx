import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PublishActionButtons, {
  PublishActionButtonsProps,
} from '../PublishActionButtons';

describe('PublishActionButtons', () => {
  const setup = (props: Partial<PublishActionButtonsProps> = {}) => {
    const initialProps: PublishActionButtonsProps = {
      onCancel: () => {},
      onPublish: () => {},
      edit: false,
    };
    const utils = render(<PublishActionButtons {...initialProps} {...props} />);
    const buttons = {
      cancel: utils.getByText('취소'),
      publish: utils.getByText(/(출간|수정)하기/),
    };
    return {
      ...utils,
      buttons,
    };
  };
  it('renders properly', () => {
    setup();
  });
  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
  it('calls onCancel and onPublish', () => {
    const onCancel = jest.fn();
    const onPublish = jest.fn();
    const utils = setup({
      onCancel,
      onPublish,
    });
    fireEvent.click(utils.buttons.publish);
    expect(onPublish).toBeCalled();
    fireEvent.click(utils.buttons.cancel);
    expect(onCancel).toBeCalled();
  });
  it('changes button text when edit is true', () => {
    const { getByText } = setup({
      edit: true,
    });
    getByText('수정하기');
  });
});
