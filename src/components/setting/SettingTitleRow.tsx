import React from 'react';
import SettingRow from './SettingRow';

export type SettingTitleRowProps = {};

function SettingTitleRow(props: SettingTitleRowProps) {
  return (
    <SettingRow
      title="벨로그 제목"
      description="개인 페이지의 좌측 상단에 나타나는 페이지 제목입니다."
      editButton
    >
      velopert.log
    </SettingRow>
  );
}

export default SettingTitleRow;
