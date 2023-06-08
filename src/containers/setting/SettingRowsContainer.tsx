import React, { useCallback } from 'react';
import SettingRows from '../../components/setting/SettingRows';
import useVelogConfig from './hooks/useVelogConfig';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import useUserProfile from './hooks/useUserProfile';
import useUpdateSocialInfo from './hooks/useUpdateSocialInfo';
import useUpdateEmailRules from './hooks/useUpdateEmailRules';
import useUnregister from './hooks/useUnregister';
import useChangeEmail from './hooks/useChangeEmail';

export type SettingRowsContainerProps = {};

function SettingRowsContainer(props: SettingRowsContainerProps) {
  const { velogConfig, update: updateTitle } = useVelogConfig();
  const { profile, meta } = useUserProfile();
  const user = useSelector((state: RootState) => state.core.user);
  const updateSocialInfo = useUpdateSocialInfo();
  const { update: updateEmailRules } = useUpdateEmailRules();
  const { change: changeEmail, called: isEmailSent } = useChangeEmail();
  const unregister = useUnregister();

  const onUpdateEmailRules = useCallback(
    ({
      promotion,
      notification,
    }: {
      promotion: boolean;
      notification: boolean;
    }) => {
      return updateEmailRules({
        notification,
        promotion,
      });
    },
    [updateEmailRules],
  );

  if (!velogConfig || !user || !profile || !meta) return null;

  return (
    <SettingRows
      title={velogConfig.title}
      username={user.username}
      email={user.email}
      onUpdateTitle={updateTitle}
      onChangeEmail={changeEmail}
      profileLinks={profile.profile_links}
      onUpdateSocialInfo={updateSocialInfo.update}
      onUpdateEmailRules={onUpdateEmailRules}
      onUnregister={unregister}
      userMeta={meta}
      isEmailSent={isEmailSent}
    />
  );
}

export default SettingRowsContainer;
