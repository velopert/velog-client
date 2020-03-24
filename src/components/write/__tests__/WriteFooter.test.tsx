import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import WriteFooter, { WriteFooterProps } from '../WriteFooter';

describe('WriteFooter', () => {
  const setup = (props: Partial<WriteFooterProps> = {}) => {
    const initialProps: WriteFooterProps = {
      edit: false,
      onGoBack: () => {},
      onPublish: () => {},
      onTempSave: () => {},
    };
    const utils = render(<WriteFooter {...initialProps} {...props} />);
    const buttons = {
      tempSave: utils.getByText('임시저장'),
      publish: utils.getByText(/(출간|수정)하기/),
      goBack: utils.getByText('나가기'),
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
    const onGoBack = jest.fn();
    const utils = setup({ onPublish, onTempSave, onGoBack });
    const { tempSave, publish, goBack } = utils.buttons;
    fireEvent.click(tempSave);
    expect(onTempSave).toBeCalled();
    fireEvent.click(publish);
    expect(onPublish).toBeCalled();
    fireEvent.click(goBack);
    expect(onGoBack).toBeCalled();
  });
  it('changes button text when edit is true', () => {
    const { buttons } = setup({
      edit: true,
    });
    expect(buttons.publish.textContent).toBe('수정하기');
  });
});
