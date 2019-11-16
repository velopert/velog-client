import React, { useState } from 'react';
import SettingRow from './SettingRow';
import useInput from '../../lib/hooks/useInput';
import SettingInput from './SettingInput';
import styled from 'styled-components';
import Button from '../common/Button';

export type SettingTitleRowProps = {
  title: string;
  onUpdateTitle: (title: string) => Promise<any>;
};

function SettingTitleRow({ title, onUpdateTitle }: SettingTitleRowProps) {
  const [edit, setEdit] = useState(false);
  const [value, onChange] = useInput(title);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdateTitle(value);
    setEdit(false);
  };

  return (
    <SettingRow
      title="벨로그 제목"
      description="개인 페이지의 좌측 상단에 나타나는 페이지 제목입니다."
      editButton={!edit}
      onClickEdit={() => setEdit(true)}
    >
      {edit ? (
        <Form onSubmit={onSubmit}>
          <SettingInput
            value={value}
            onChange={onChange}
            placeholder="벨로그 제목"
          />
          <Button>저장</Button>
        </Form>
      ) : (
        title
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

export default SettingTitleRow;
