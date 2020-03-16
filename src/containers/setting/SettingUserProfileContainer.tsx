import React from 'react';
import SettingUserProfile from '../../components/setting/SettingUserProfile';
import useUpload from '../../lib/hooks/useUpload';
import useS3Upload from '../../lib/hooks/useS3Upload';
import useUserProfile from './hooks/useUserProfile';
import useUpdateThumbnail from './hooks/useUpdateThumbnail';
import useUser from '../../lib/hooks/useUser';
import RequireLogin from '../../components/common/RequireLogin';

export type SettingUserProfileContainerProps = {};

function SettingUserProfileContainer(props: SettingUserProfileContainerProps) {
  const user = useUser();
  const { profile, loading, update } = useUserProfile();
  const [upload] = useUpload();
  const [s3Upload, image, error] = useS3Upload();
  const updateThumbnail = useUpdateThumbnail();

  const uploadThumbnail = async () => {
    const file = await upload();
    if (!file) return;
    const image = await s3Upload(file, { type: 'profile' });
    if (!image) return;
    updateThumbnail(image);
  };

  const clearThumbnail = () => {
    updateThumbnail(null);
  };

  const onUpdate = (params: { displayName: string; shortBio: string }) => {
    return update(params);
  };

  if (!user) {
    return <RequireLogin hasMargin />;
  }

  if (!profile) return null;

  return (
    <SettingUserProfile
      onUpload={uploadThumbnail}
      onUpdate={onUpdate}
      onClearThumbnail={clearThumbnail}
      displayName={profile.display_name}
      shortBio={profile.short_bio}
      thumbnail={profile.thumbnail}
    />
  );
}

export default SettingUserProfileContainer;
