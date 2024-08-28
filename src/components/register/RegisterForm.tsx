import * as React from 'react';
import styled, { css } from 'styled-components';
import LabelInput from '../common/LabelInput';
import useInputs from '../../lib/hooks/useInputs';
import RoundButton from '../common/RoundButton';
import palette from '../../lib/styles/palette';
import { themedPalette } from '../../lib/styles/themes';
import { CheckIcon } from '../../static/svg';
import { useState, useEffect } from 'react';

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

const CheckRow = styled.div`
  display: flex;
  align-items: center;
  color: ${themedPalette.text1};
  gap: 0.5rem;
  cursor: pointer;

  a {
    color: ${themedPalette.primary1};
  }
`;

const Box = styled.div<{ isChecked: boolean }>`
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid ${themedPalette.border2};
  border-radius: 4px;
  ${(props) =>
    props.isChecked &&
    css`
      background: ${themedPalette.primary1};
      border: 1px solid ${themedPalette.primary1};
    `}

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: white;
    width: 1rem;
    height: 1rem;
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
  fixedEmail: string | null | undefined;
  error: string | null;
  defaultInfo: {
    displayName: string;
    username: string;
  } | null;
  loading: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  fixedEmail,
  error,
  defaultInfo,
  loading,
}) => {
  const [form, onChange] = useInputs({
    displayName: defaultInfo ? defaultInfo.displayName : '',
    email: '',
    username: defaultInfo ? defaultInfo.username : '',
    shortBio: '',
  });
  const [isChecked, setIsChecked] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (isChecked) {
      setLocalError(null);
    }
  }, [isChecked]);

  return (
    <RegisterFormBlock>
      <LabelInput
        name="displayName"
        onChange={onChange}
        label="프로필 이름"
        placeholder="프로필 이름을 입력하세요. 프로필 설정에서 변경이 가능합니다."
        value={form.displayName}
        size={20}
      />
      {fixedEmail && (
        <LabelInput
          name="email"
          onChange={onChange}
          label="이메일"
          placeholder="이메일을 입력하세요"
          value={fixedEmail || form.email}
          disabled={!!fixedEmail}
          size={25}
        />
      )}
      <LabelInput
        name="username"
        onChange={onChange}
        label="사용자 ID"
        placeholder="새 사용자 ID를 입력하세요. 변경이 불가능합니다."
        value={form.username}
        size={22}
      />
      <LabelInput
        name="shortBio"
        onChange={onChange}
        label="한 줄 소개"
        placeholder="당신을 한 줄로 소개해보세요"
        value={form.shortBio}
        size={30}
      />
      <CheckRow
        onClick={() => {
          setIsChecked((v) => !v);
        }}
      >
        <Box isChecked={isChecked}>
          <CheckIcon />
        </Box>
        <span>
          <a
            href="https://velog.io/policy/terms"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            이용약관
          </a>
          과{' '}
          <a
            href="https://velog.io/policy/terms"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
          >
            개인정보취급방침
          </a>
          에 동의합니다.
        </span>
      </CheckRow>
      <div className="form-bottom">
        {(error || localError) && (
          <div className="error">{error || localError}</div>
        )}
        <div className="buttons">
          <RoundButton inline color="lightGray" to="/" size="LARGE">
            취소
          </RoundButton>
          <RoundButton
            inline
            type="submit"
            onClick={() => {
              if (!isChecked) {
                setLocalError('이용약관과 개인정보취급방침에 동의해주세요.');
                return;
              }
              onSubmit({ ...form, email: fixedEmail || form.email });
            }}
            size="LARGE"
            disabled={loading}
          >
            가입
          </RoundButton>
        </div>
      </div>
    </RegisterFormBlock>
  );
};

export default RegisterForm;
