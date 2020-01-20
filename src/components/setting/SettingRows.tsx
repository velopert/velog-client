import React from 'react';
import styled from 'styled-components';
import SettingRow from './SettingRow';
import SettingTitleRow from './SettingTitleRow';
import SettingSocialInfoRow from './SettingSocialInfoRow';
import SettingEmailRulesRow from './SettingEmailRulesRow';
import { createFallbackTitle } from '../../lib/utils';
import { ProfileLinks } from '../../lib/graphql/user';
import SettingUnregisterRow from './SettingUnregisterRow';
import media from '../../lib/styles/media';

export type SettingRowsProps = {
  title: string | null;
  username: string;
  onUpdateTitle: (title: string) => Promise<any>;
  onUpdateSocialInfo: (profileLinks: ProfileLinks) => Promise<any>;
  onUpdateEmailRules: (params: {
    promotion: boolean;
    notification: boolean;
  }) => Promise<any>;
  onUnregister: () => void;
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
  onUnregister,
}: SettingRowsProps) {
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
      <SettingUnregisterRow onUnregister={onUnregister} />
    </Rows>
  );
}

const Rows = styled.section`
  margin-top: 4rem;
  ${media.small} {
    margin-top: 0rem;
  }
`;

export default SettingRows;
