import React from 'react';
import styled from 'styled-components';
import SettingRow from './SettingRow';
import SettingTitleRow from './SettingTitleRow';
import SettingSocialInfoRow from './SettingSocialInfoRow';
import SettingEmailRulesRow from './SettingEmailRulesRow';
import Button from '../common/Button';
import { createFallbackTitle } from '../../lib/utils';
import { ProfileLinks } from '../../lib/graphql/user';

export type SettingRowsProps = {
  title: string | null;
  username: string;
  onUpdateTitle: (title: string) => Promise<any>;
  onUpdateSocialInfo: (profileLinks: ProfileLinks) => Promise<any>;
  onUpdateEmailRules: (params: {
    field: 'promotion' | 'notification';
    value: boolean;
  }) => Promise<any>;
  profileLinks: {
    url?: string;
    github?: string;
    facebook?: string;
    twitter?: string;
    email?: string;
  };
  userMeta: {
    id: string;
    email_notification: boolean;
    email_promotion: boolean;
  };
};

function SettingRows({
  title,
  username,
  profileLinks,
  userMeta,
  onUpdateTitle,
  onUpdateSocialInfo,
  onUpdateEmailRules,
}: SettingRowsProps) {
  console.log(userMeta);
  return (
    <Rows>
      <SettingTitleRow
        title={title || createFallbackTitle(username)}
        onUpdateTitle={onUpdateTitle}
      />
      <SettingSocialInfoRow {...profileLinks} onUpdate={onUpdateSocialInfo} />
      <SettingRow
        title="이메일 주소"
        description="회원 인증 또는 시스템에서 발송하는 이메일을 수신하는 주소입니다."
      >
        public.velopert@gmail.com
      </SettingRow>
      {userMeta && (
        <SettingEmailRulesRow
          notification={userMeta.email_notification}
          promotion={userMeta.email_promotion}
          onUpdate={onUpdateEmailRules}
        />
      )}
      <SettingRow
        title="회원 탈퇴"
        description="탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다."
      >
        <Button color="red">회원 탈퇴</Button>
      </SettingRow>
    </Rows>
  );
}

const Rows = styled.section`
  margin-top: 4rem;
`;

export default SettingRows;
