import React from 'react';
import SettingRow from './SettingRow';
import ToggleSwitch from '../common/ToggleSwitch';
import styled from 'styled-components';

export type SettingEmailRulesRowProps = {};

function SettingEmailRulesRow(props: SettingEmailRulesRowProps) {
  return (
    <SettingRow title="이메일 수신 설정">
      <Rules>
        <li>
          <span>댓글 알림</span>
          <ToggleSwitch />
        </li>
        <li>
          <span>벨로그 업데이트 소식</span>
          <ToggleSwitch />
        </li>
        <li>
          <span>팔로잉중인 유저 및 태그의 포스트</span>
          <ToggleSwitch />
        </li>
      </Rules>
    </SettingRow>
  );
}

const Rules = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    display: flex;
    align-items: center;
    span {
      width: 14rem;
    }
  }
  li + li {
    margin-top: 0.5rem;
  }
`;

export default SettingEmailRulesRow;
