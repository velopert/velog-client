import React, { useCallback } from 'react';
import SettingRow from './SettingRow';
import ToggleSwitch from '../common/ToggleSwitch';
import styled from 'styled-components';

export type SettingEmailRulesRowProps = {
  notification: boolean;
  promotion: boolean;
  onUpdate: (params: {
    field: 'promotion' | 'notification';
    value: boolean;
  }) => Promise<any>;
};

function SettingEmailRulesRow({
  notification,
  promotion,
  onUpdate,
}: SettingEmailRulesRowProps) {
  const onChange = useCallback(
    (params: { name: string; value: boolean }) => {
      onUpdate({
        field: params.name as 'promotion' | 'notification',
        value: params.value,
      });
    },
    [onUpdate],
  );
  return (
    <SettingRow title="이메일 수신 설정">
      <Rules>
        <li>
          <span>댓글 알림</span>
          <ToggleSwitch
            value={notification}
            name="notification"
            onChange={onChange}
          />
        </li>
        <li>
          <span>벨로그 업데이트 소식</span>
          <ToggleSwitch
            value={promotion}
            name="promotion"
            onChange={onChange}
          />
        </li>
        {/* <li>
          <span>팔로잉중인 유저 및 태그의 포스트</span>
          <ToggleSwitch value={false} />
        </li> */}
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
