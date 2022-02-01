import React, { useState, FormEvent } from 'react';
import SettingRow from './SettingRow';
import {
  GithubIcon,
  TwitterIcon,
  FacebookSquareIcon,
  EmailIcon,
} from '../../static/svg';
import { MdHome } from 'react-icons/md';
import styled, { css } from 'styled-components';
import Button from '../common/Button';
import SettingInput from './SettingInput';
import useInputs from '../../lib/hooks/useInputs';
import { themedPalette } from '../../lib/styles/themes';
import { ProfileLinks } from '../../lib/graphql/user';
import SettingEditButton from './SettingEditButton';
import media from '../../lib/styles/media';

export type SettingSocialInfoRowProps = {
  email?: string;
  github?: string;
  twitter?: string;
  facebook?: string;
  url?: string;
  onUpdate: (profileLinks: ProfileLinks) => Promise<any>;
};

const iconArray = [
  EmailIcon,
  GithubIcon,
  TwitterIcon,
  FacebookSquareIcon,
  MdHome,
];

function SettingSocialInfoRow({
  email,
  github,
  twitter,
  facebook,
  url,
  onUpdate,
}: SettingSocialInfoRowProps) {
  const infoArray = [email, github, twitter, facebook, url];
  const empty = infoArray.every((value) => !value);
  const [edit, setEdit] = useState(false);
  const [form, onChange] = useInputs({ email, github, twitter, facebook, url });
  const [facebookInputFocus, setFacebookInputFocus] = useState(false);
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onUpdate(form);
    setEdit(false);
  };

  const infoInputsList = edit && (
    <Form onSubmit={onSubmit}>
      <InfoList>
        <li>
          <EmailIcon />
          <SettingInput
            value={form.email}
            onChange={onChange}
            name="email"
            placeholder="이메일을 입력하세요."
            fullWidth
          />
        </li>
        <li>
          <GithubIcon />
          <SettingInput
            value={form.github}
            onChange={onChange}
            name="github"
            placeholder="Github 계정을 입력하세요."
          />
        </li>
        <li>
          <TwitterIcon />
          <SettingInput
            value={form.twitter}
            onChange={onChange}
            name="twitter"
            placeholder="Twitter 계정을 입력하세요."
          />
        </li>
        <li>
          <FacebookSquareIcon />
          <FacebookInputBox
            tabIndex={0}
            focus={facebookInputFocus}
            onFocus={(e) => {
              const el = e.currentTarget.querySelector('input');
              if (!el) return;
              el.focus();
            }}
          >
            <span>https://www.facebook.com/</span>
            <input
              size={0}
              value={form.facebook}
              name="facebook"
              onChange={onChange}
              onFocus={() => setFacebookInputFocus(true)}
              onBlur={() => setFacebookInputFocus(false)}
            />
          </FacebookInputBox>
        </li>
        <li>
          <MdHome />
          <SettingInput
            value={form.url}
            onChange={onChange}
            name="url"
            placeholder="홈페이지 주소를 입력하세요."
            fullWidth
          />
        </li>
      </InfoList>
      <div className="button-wrapper">
        <Button>저장</Button>
      </div>
    </Form>
  );

  const infoValueList = !edit && (
    <InfoList>
      {infoArray.map((value, i) =>
        value ? (
          <li key={i}>
            {React.createElement(iconArray[i])}
            <span>{value}</span>
          </li>
        ) : null,
      )}
    </InfoList>
  );

  const onClickEdit = () => setEdit(true);

  return (
    <SettingRow
      title="소셜 정보"
      description="포스트 및 블로그에서 보여지는 프로필에 공개되는 소셜 정보입니다."
      editButton={!edit && !empty}
      onClickEdit={onClickEdit}
    >
      {edit ? infoInputsList : infoValueList}
      {!edit && empty && (
        <SettingEditButton customText="정보 추가" onClick={onClickEdit} />
      )}
    </SettingRow>
  );
}

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    display: flex;
    align-items: center;
    svg {
      width: 1rem;
      height: 1rem;
      font-size: 1rem;
      margin-right: 0.5rem;
      flex-shrink: 0;
    }
    span {
      font-size: 1rem;
    }
  }
  li + li {
    margin-top: 0.5rem;
  }
`;

const FacebookInputBox = styled.div<{ focus: boolean }>`
  flex: 1;
  display: flex;
  border: 1px solid ${themedPalette.border3};
  background: ${themedPalette.bg_element1};
  padding: 0.5rem;
  color: ${themedPalette.text2};
  font-size: 1rem;
  line-height: 1rem;
  outline: none;
  border-radius: 4px;
  height: 2.25rem;
  align-items: center;
  span {
    color: ${themedPalette.text3};
    margin-right: 0.25rem;
  }
  input {
    padding: 0;
    border: 0;
    outline: none;
    font-size: 1rem;
    line-height: 1;
    flex: 1;
    width: 100%;
    background: transparent;
    color: ${themedPalette.text1};
  }
  ${(props) =>
    props.focus &&
    css`
      border: 1px solid ${themedPalette.border1};
    `}
`;

const Form = styled.form`
  width: 25rem;
  ${media.small} {
    width: 100%;
  }
  li + li {
    margin-top: 1rem;
  }
  .button-wrapper {
    margin-top: 1.5rem;
    display: flex;
    justify-content: flex-end;
  }
`;

export default SettingSocialInfoRow;
