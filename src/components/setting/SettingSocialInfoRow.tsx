import React from 'react';
import SettingRow from './SettingRow';
import {
  GithubIcon,
  TwitterIcon,
  FacebookSquareIcon,
  EmailIcon,
} from '../../static/svg';
import { MdHome } from 'react-icons/md';
import styled from 'styled-components';

export type SettingSocialInfoRowProps = {
  email?: string;
  github?: string;
  twitter?: string;
  facebook?: string;
  homepage?: string;
};

function SettingSocialInfoRow({
  email,
  github,
  twitter,
  facebook,
  homepage,
}: SettingSocialInfoRowProps) {
  return (
    <SettingRow
      title="소셜 정보"
      description="포스트 및 블로그에서 보여지는 프로필에 공개되는 소셜 정보입니다."
      editButton={true}
    >
      <InfoList>
        <li>
          <EmailIcon />
          <span>public.velopert@gmail.com</span>
        </li>
        <li>
          <GithubIcon />
          <span>velopert</span>
        </li>
        <li>
          <TwitterIcon />
          <span>velopert</span>
        </li>
        <li>
          <FacebookSquareIcon />
          <span>https://facebook.com/velopert</span>
        </li>
        <li>
          <MdHome />
          <span>https://velopert.com/</span>
        </li>
      </InfoList>
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
    }
    span {
      font-size: 1rem;
    }
  }
  li + li {
    margin-top: 0.5rem;
  }
`;

export default SettingSocialInfoRow;
