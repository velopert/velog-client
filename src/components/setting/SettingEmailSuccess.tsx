import * as React from 'react';
import { MdCheck } from 'react-icons/md';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

function SettingEmailSuccess() {
  return (
    <SettingEmailSuccessBlock>
      <MdCheck className="icon" />
      <div className="text">
        메일이 전송되었습니다. 받은 편지함을 확인하세요.
      </div>
    </SettingEmailSuccessBlock>
  );
}

const SettingEmailSuccessBlock = styled.div`
  display: flex;
  align-items: center;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  color: ${palette.teal6};
  white-space: pre;
  .icon {
    margin-right: 10px;
  }
  .description {
    font-size: 0.875rem;
    text-align: center;
  }
`;

export default SettingEmailSuccess;
