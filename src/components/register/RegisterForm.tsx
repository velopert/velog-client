import React from 'react';
import styled from 'styled-components';
import LabelInput from '../common/LabelInput';
import useInputs from '../../lib/hooks/useInputs';
import RoundButton from '../common/RoundButton';
import palette from '../../lib/styles/palette';

const RegisterFormBlock = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
  .form-bottom {
    margin-top: 6rem;
  }
  .error {
    margin-bottom: 1rem;
    font-size: 1.125rem;
    line-height: 1.5;
    color: ${palette.red5};
    font-weight: bold;
  }
`;

export type RegisterFormType = {
  displayName: string;
  email: string;
  username: string;
  shortBio: string;
};

export interface RegisterFormProps {
  onSubmit: (form: RegisterFormType) => any;
  defaultEmail: string | null | undefined;
  error: string | null;
}

const RegisterForm: React.SFC<RegisterFormProps> = ({
  onSubmit,
  defaultEmail,
  error,
}) => {
  const [form, onChange] = useInputs<RegisterFormType>({
    displayName: '',
    email: '',
    username: '',
    shortBio: '',
  });
  return (
    <RegisterFormBlock>
      <LabelInput
        name="displayName"
        onChange={onChange}
        label="이름"
        placeholder="이름을 입력하세요"
        value={form.displayName}
        size={20}
      />
      <LabelInput
        name="email"
        onChange={onChange}
        label="이메일"
        placeholder="이메일을 입력하세요"
        value={defaultEmail || form.email}
        disabled={!!defaultEmail}
        size={25}
      />
      <LabelInput
        name="username"
        onChange={onChange}
        label="아이디"
        placeholder="아이디를 입력하세요"
        value={form.username}
        size={15}
      />
      <LabelInput
        name="shortBio"
        onChange={onChange}
        label="한 줄 소개"
        placeholder="당신을 한 줄로 소개해보세요"
        value={form.shortBio}
        size={30}
      />
      <div className="form-bottom">
        {error && <div className="error">{error}</div>}
        <div className="buttons">
          <RoundButton inline color="gray" to="/" size="LARGE">
            취소
          </RoundButton>
          <RoundButton
            inline
            type="submit"
            onClick={() =>
              onSubmit({ ...form, email: defaultEmail || form.email })
            }
            size="LARGE"
          >
            다음
          </RoundButton>
        </div>
      </div>
    </RegisterFormBlock>
  );
};

export default RegisterForm;
