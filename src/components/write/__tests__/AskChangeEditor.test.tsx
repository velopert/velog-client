import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AskChangeEditor, { AskChangeEditorProps } from '../AskChangeEditor';
import { WriteMode } from '../../../modules/write';

describe('AskChangeEditor', () => {
  const setup = (props: Partial<AskChangeEditorProps> = {}) => {
    const initialProps: AskChangeEditorProps = {
      visible: true,
      onCancel: () => undefined,
      onConfirm: () => undefined,
      convertTo: WriteMode.MARKDOWN,
    };
    const utils = render(<AskChangeEditor {...initialProps} {...props} />);
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
  describe('buttons', () => {
    it('onCancel is working', () => {
      const onCancel = jest.fn();
      const { getByText } = setup({
        onCancel,
      });
      const cancelButton = getByText('취소');
      fireEvent.click(cancelButton);
      expect(onCancel).toBeCalled();
    });

    it('onConfirm is working', () => {
      const onConfirm = jest.fn();
      const { getByText } = setup({
        onConfirm,
      });
      const cancelButton = getByText('확인');
      fireEvent.click(cancelButton);
      expect(onConfirm).toBeCalled();
    });
  });

  describe('convertTo', () => {
    it('convert to markdown', () => {
      const { getByText } = setup({
        convertTo: WriteMode.MARKDOWN,
      });
      getByText('마크다운 에디터로 전환');
    });
    it('convert to quill', () => {
      const { getByText } = setup({
        convertTo: WriteMode.WYSIWYG,
      });
      getByText('쉬운 에디터로 전환');
    });
  });
});
