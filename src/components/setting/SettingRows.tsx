import React from 'react';
import styled from 'styled-components';
import SettingTitleRow from './SettingTitleRow';
import SettingSocialInfoRow from './SettingSocialInfoRow';
import SettingEmailRulesRow from './SettingEmailRulesRow';
import { createFallbackTitle } from '../../lib/utils';
import { ProfileLinks } from '../../lib/graphql/user';
import SettingUnregisterRow from './SettingUnregisterRow';
import media from '../../lib/styles/media';
import SettingEmailRow from './SettingEmailRow';

export type SettingRowsProps = {
  title: string | null;
  username: string;
  email: string;
  isEmailSent: boolean;
  onUpdateTitle: (title: string) => Promise<any>;
  onChangeEmail: (email: string) => Promise<any>;
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
  email,
  onUpdateTitle,
  onChangeEmail,
  onUpdateSocialInfo,
  onUpdateEmailRules,
  onUnregister,
  isEmailSent,
}: SettingRowsProps) {
  return (
    <Rows>
      <SettingTitleRow
        title={title || createFallbackTitle(username)}
        onUpdateTitle={onUpdateTitle}
      />
      <SettingSocialInfoRow {...profileLinks} onUpdate={onUpdateSocialInfo} />
      <SettingEmailRow
        email={email}
        onChangeEmail={onChangeEmail}
        isEmailSent={isEmailSent}
      />
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
