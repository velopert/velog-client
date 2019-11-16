import React from 'react';
import SettingRows from '../../components/setting/SettingRows';
import useVelogConfig from './hooks/useVelogConfig';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import useUserProfile from './hooks/useUserProfile';

export type SettingRowsContainerProps = {};

function SettingRowsContainer(props: SettingRowsContainerProps) {
  const { velogConfig, update: updateTitle } = useVelogConfig();
  const { profile } = useUserProfile();
  const user = useSelector((state: RootState) => state.core.user);

  if (!velogConfig || !user || !profile) return null;

  return (
    <SettingRows
      title={velogConfig.title}
      username={user.username}
      onUpdateTitle={updateTitle}
      profileLinks={profile.profile_links}
    />
  );
}

export default SettingRowsContainer;
