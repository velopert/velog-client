import React, { useEffect } from 'react';
import SettingUserProfile from '../../components/setting/SettingUserProfile';
import useUpload from '../../lib/hooks/useUpload';
import useS3Upload from '../../lib/hooks/useS3Upload';
import useUserProfile from './hooks/useUserProfile';
import { FaUnlockAlt } from 'react-icons/fa';

export type SettingUserProfileContainerProps = {};

function SettingUserProfileContainer(props: SettingUserProfileContainerProps) {
  const { profile, loading } = useUserProfile();
  const [upload] = useUpload();
  const [s3Upload, image, error] = useS3Upload();

  const uploadThumbnail = async () => {
    const file = await upload();
    if (!file) return;
    const image = await s3Upload(file, { type: 'profile' });
  };

  if (!profile) return null;

  return (
    <SettingUserProfile
      onUpload={uploadThumbnail}
      displayName={profile.display_name}
      shortBio={profile.short_bio}
      thumbnail={profile.thumbnail}
    />
  );
}

export default SettingUserProfileContainer;
