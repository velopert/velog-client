import React, { useState } from 'react';
import SettingRow from './SettingRow';
import useInput from '../../lib/hooks/useInput';
import SettingInput from './SettingInput';
import styled from 'styled-components';
import Button from '../common/Button';
import SettingEmailSuccess from './SettingEmailSuccess';
import { toast } from 'react-toastify';
import { EMAIL_EXISTS } from '../../lib/graphql/user';
import client from '../../lib/graphql/client';

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
  const [value, onChange] = useInput(email ?? '');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(value)) {
      toast.error('잘못된 이메일 형식입니다.');
      return;
    }

    if (value === email) {
      toast.error('새 이메일 주소가 현재 이메일과 동일합니다.');
      return;
    }

    const response = await client.query<{ emailExists: boolean }>({
      query: EMAIL_EXISTS,
      fetchPolicy: 'network-only',
      variables: { email: value.trim() },
    });

    if (response.data.emailExists) {
      toast.error('동일한 이메일이 존재합니다.');
      return;
    }

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

function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
