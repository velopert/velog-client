import * as React from 'react';
import { render } from 'react-testing-library';
import PublishPrivacySetting, {
  PublishPrivacySettingProps,
  PrivacySetting,
} from '../PublishPrivacySetting';

describe('PublishPrivacySetting', () => {
  const setup = (props: Partial<PublishPrivacySettingProps> = {}) => {
    const initialProps: PublishPrivacySettingProps = {
      selected: PrivacySetting.PUBLIC,
      onSelect: () => {},
    };
    const utils = render(
      <PublishPrivacySetting {...initialProps} {...props} />,
    );
    const buttons = {
      public: utils.getByText('전체 공개'),
      private: utils.getByText('나만 보기'),
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
  describe('shows active style', () => {
    it('PUBLIC', () => {
      const utils = setup();
      expect(getComputedStyle(utils.buttons.public).color).toBe(
        'rgb(32, 201, 151)',
      );
    });
    it('PRIVATE', () => {
      const utils = setup({ selected: PrivacySetting.PRIVATE });
      expect(getComputedStyle(utils.buttons.private).color).toBe(
        'rgb(32, 201, 151)',
      );
    });
  });
  // it('calls onSelect function onClick', () => {})
});
