import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PublishPrivacySetting, {
  PublishPrivacySettingProps,
} from '../PublishPrivacySetting';

describe('PublishPrivacySetting', () => {
  const setup = (props: Partial<PublishPrivacySettingProps> = {}) => {
    const initialProps: PublishPrivacySettingProps = {
      isPrivate: false,
      onSelect: () => {},
    };
    const utils = render(
      <PublishPrivacySetting {...initialProps} {...props} />,
    );
    const buttons = {
      public: utils.getByText('전체 공개').parentElement,
      private: utils.getByText('비공개').parentElement,
    };
    return {
      ...utils,
      buttons,
    };
  };
  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
  describe('shows active style', () => {
    it('PUBLIC', () => {
      const utils = setup();
      expect(getComputedStyle(utils.buttons.public).color).toBe(
        'rgb(32, 201, 151)',
      );
    });
    it('PRIVATE', () => {
      const utils = setup({ isPrivate: true });
      expect(getComputedStyle(utils.buttons.private).color).toBe(
        'rgb(32, 201, 151)',
      );
    });
  });
  it('calls onSelect function onClick', () => {
    const onSelect = jest.fn();
    const utils = setup({ onSelect });
    fireEvent.click(utils.buttons.private);
    expect(onSelect).toBeCalledWith(true);
    fireEvent.click(utils.buttons.public);
    expect(onSelect).toBeCalledWith(false);
  });
});
