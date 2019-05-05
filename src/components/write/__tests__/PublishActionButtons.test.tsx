import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import PublishActionButtons, {
  PublishActionButtonsProps,
} from '../PublishActionButtons';

describe('PublishActionButtons', () => {
  const setup = (props: Partial<PublishActionButtonsProps> = {}) => {
    const initialProps: PublishActionButtonsProps = {
      onCancel: () => {},
      onPublish: () => {},
    };
    const utils = render(<PublishActionButtons {...initialProps} {...props} />);
    const buttons = {
      cancel: utils.getByText('취소'),
      publish: utils.getByText('출간하기'),
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
});
