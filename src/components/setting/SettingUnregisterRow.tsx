import React, { useState } from 'react';
import Button from '../common/Button';
import SettingRow from './SettingRow';
import PopupOKCancel from '../common/PopupOKCancel';

export type SettingUnregisterRowProps = {
  onUnregister: () => void;
};

function SettingUnregisterRow({ onUnregister }: SettingUnregisterRowProps) {
  const [ask, setAsk] = useState(false);
  return (
    <>
      <SettingRow
        title="회원 탈퇴"
        description="탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다."
      >
        <Button color="red" onClick={() => setAsk(true)}>
          회원 탈퇴
        </Button>
      </SettingRow>
      <PopupOKCancel
        title="회원 탈퇴"
        visible={ask}
        onCancel={() => setAsk(false)}
        onConfirm={onUnregister}
      >
        정말로 탈퇴 하시겠습니까?
      </PopupOKCancel>
    </>
  );
}

export default SettingUnregisterRow;
