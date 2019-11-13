import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import SettingEditButton from './SettingEditButton';
import { userThumbnail } from '../../static/images';

export type SettingUserProfileProps = {
  onUpload: () => void;
  thumbnail: string | null;
  displayName: string | null;
  shortBio: string;
};

function SettingUserProfile({
  onUpload,
  thumbnail,
  displayName,
  shortBio,
}: SettingUserProfileProps) {
  return (
    <Section>
      <div className="thumbnail-area">
        <img src={thumbnail || userThumbnail} alt="profile" />
        <Button onClick={onUpload}>이미지 업로드</Button>
        <Button color="transparent">이미지 제거</Button>
      </div>
      <div className="info-area">
        <h2>{displayName}</h2>
        <p>{shortBio}</p>
        <SettingEditButton />
      </div>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  height: 13.75rem;
  .thumbnail-area {
    padding-right: 1.5rem;
    display: flex;
    flex-direction: column;
    img {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
      display: block;
      margin-bottom: 1.25rem;
    }
    button + button {
      margin-top: 0.5rem;
    }
  }
  .info-area {
    padding-left: 1.5rem;
    border-left: 1px solid ${palette.gray2};
    h2 {
      font-size: 2.25rem;
      margin: 0;
      line-height: 1.5;
      color: ${palette.gray8};
    }
    p {
      font-size: 1rem;
      margin-top: 0.25rem;
      margin-bottom: 0.5rem;
      line-height: 1.5;
      color: ${palette.gray6};
    }
  }
`;

export default SettingUserProfile;
