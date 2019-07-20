import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import WriteFooter, { WriteFooterProps } from '../WriteFooter';

describe('WriteFooter', () => {
  const setup = (props: Partial<WriteFooterProps> = {}) => {
    const initialProps: WriteFooterProps = {
      onPublish: () => {},
      onTempSave: () => {},
    };
    const utils = render(<WriteFooter {...initialProps} {...props} />);
    const buttons = {
      tempSave: utils.getByText('임시저장'),
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
  it('buttons are working properly', () => {
    const onPublish = jest.fn();
    const onTempSave = jest.fn();
    const utils = setup({ onPublish, onTempSave });
    const { tempSave, publish } = utils.buttons;
    fireEvent.click(tempSave);
    expect(onTempSave).toBeCalled();
    fireEvent.click(publish);
    expect(onPublish).toBeCalled();
  });
  it('changes button text when edit is true', () => {
    const { buttons } = setup({
      edit: true,
    });
    expect(buttons.publish.textContent).toBe('수정하기');
  });
});
