import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SettingUserProfile, {
  SettingUserProfileProps,
} from '../SettingUserProfile';
import optimizeImage from '../../../lib/optimizeImage';

describe('SettingUserProfile', () => {
  const setup = (props: Partial<SettingUserProfileProps> = {}) => {
    const initialProps: SettingUserProfileProps = {
      onUpload: () => {},
      onClearThumbnail: () => {},
      thumbnail:
        'https://images.velog.io/images/velopert/profile/ca385170-77e7-11e9-ba3a-fb3a8e4f1096/1536400727.98.png',
      displayName: 'Minjun Kim',
      shortBio: 'Hello World',
      onUpdate: () => Promise.resolve(),
    };
    const utils = render(<SettingUserProfile {...initialProps} {...props} />);
    return {
      ...utils,
    };
  };
  it('renders properly', () => {
    const utils = setup();
    const img = utils.getByAltText('profile') as HTMLImageElement;
    expect(img.src).toBe(
      optimizeImage(
        'https://images.velog.io/images/velopert/profile/ca385170-77e7-11e9-ba3a-fb3a8e4f1096/1536400727.98.png',
        400,
      ),
    );
    utils.getByText('Minjun Kim');
    utils.getByText('Hello World');
  });
  it('calls onUpload', () => {
    const onUpload = jest.fn();
    const { getByText } = setup({ onUpload });
    fireEvent.click(getByText('이미지 업로드'));
    expect(onUpload).toBeCalled();
  });
  it('calls onClearThumbnail', () => {
    const onClearThumbnail = jest.fn();
    const { getByText } = setup({ onClearThumbnail });
    fireEvent.click(getByText('이미지 제거'));
    expect(onClearThumbnail).toBeCalled();
  });
});
