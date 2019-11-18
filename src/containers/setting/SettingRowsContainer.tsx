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
  const updateEmailRules = useUpdateEmailRules();

  const onUpdateEmailRules = useCallback(
    (params: { field: 'promotion' | 'notification'; value: boolean }) => {
      if (!meta) return Promise.resolve();
      const oldRules = {
        email_notification: meta.email_notification,
        email_promotion: meta.email_promotion,
      };
      const key = `email_${params.field}`;
      const nextRules = Object.assign({}, oldRules, { [key]: params.value });
      console.log('calling..');
      return Promise.resolve();
      // return updateEmailRules.update(nextRules);
    },
    [meta],
  );

  if (!velogConfig || !user || !profile || !meta) return null;

  console.log(profile);

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
