import React, { useCallback } from 'react';
import SettingRows from '../../components/setting/SettingRows';
import useVelogConfig from './hooks/useVelogConfig';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import useUserProfile from './hooks/useUserProfile';
import useUpdateSocialInfo from './hooks/useUpdateSocialInfo';
import useUpdateEmailRules from './hooks/useUpdateEmailRules';

export type SettingRowsContainerProps = {};

function SettingRowsContainer(props: SettingRowsContainerProps) {
  const { velogConfig, update: updateTitle } = useVelogConfig();
  const { profile, meta } = useUserProfile();
  const user = useSelector((state: RootState) => state.core.user);
  const updateSocialInfo = useUpdateSocialInfo();
  const { update: updateEmailRules } = useUpdateEmailRules();

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
      onUpdateTitle={updateTitle}
      profileLinks={profile.profile_links}
      onUpdateSocialInfo={updateSocialInfo.update}
      onUpdateEmailRules={onUpdateEmailRules}
      userMeta={meta}
    />
  );
}

export default SettingRowsContainer;
