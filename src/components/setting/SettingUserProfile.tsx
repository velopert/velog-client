import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import SettingEditButton from './SettingEditButton';

export type SettingUserProfileProps = {};

function SettingUserProfile(props: SettingUserProfileProps) {
  return (
    <Section>
      <div className="thumbnail-area">
        <img
          src="https://images.velog.io/images/velopert/profile/ca385170-77e7-11e9-ba3a-fb3a8e4f1096/1536400727.98.png"
          alt="profile"
        />
        <Button>이미지 업로드</Button>
        <Button color="transparent">이미지 제거</Button>
      </div>
      <div className="info-area">
        <h2>Minjun Kim</h2>
        <p>
          Frontend Engineer @ RIDI Corp. 개발을 재미있게 하는 것을 중요시하는
          개발자입니다.
        </p>
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
