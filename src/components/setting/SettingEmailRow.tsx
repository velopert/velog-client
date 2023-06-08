import React, { useState } from 'react';
import SettingRow from './SettingRow';
import useInput from '../../lib/hooks/useInput';
import SettingInput from './SettingInput';
import styled from 'styled-components';
import Button from '../common/Button';
import SettingEmailSuccess from './SettingEmailSuccess';

export type SettingEmailRowProps = {
  email: string;
  isEmailSent: boolean;
  onChangeEmail: (email: string) => Promise<void>;
};

function SettingEmailRow({
  email,
  isEmailSent,
  onChangeEmail,
}: SettingEmailRowProps) {
  const [edit, setEdit] = useState(false);
  const [value, onChange] = useInput(email);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //! TODO: 이메일 형식으로 입력하지 않을 경우 처리
    await onChangeEmail(value);
    setEdit(false);
  };

  return (
    <SettingRow
      title="이메일 주소"
      description="회원 인증 또는 시스템에서 발송하는 이메일을 수신하는 주소입니다."
      editButton={!edit}
      showEditButton={!isEmailSent}
      onClickEdit={() => setEdit(true)}
      editButtonText="변경"
    >
      {edit ? (
        <Form onSubmit={onSubmit}>
          <SettingInput
            value={value}
            onChange={onChange}
            placeholder="이메일"
          />
          <Button>변경</Button>
        </Form>
      ) : isEmailSent ? (
        <SettingEmailSuccess />
      ) : (
        email
      )}
    </SettingRow>
  );
}

const Form = styled.form`
  display: flex;
  align-items: center;
  input {
    flex: 1;
    margin-right: 1rem;
  }
`;

export default SettingEmailRow;
