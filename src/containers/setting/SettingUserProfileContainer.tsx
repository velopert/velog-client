import React, { useState } from 'react';
import SettingUserProfile from '../../components/setting/SettingUserProfile';
import useUpload from '../../lib/hooks/useUpload';
import useUserProfile from './hooks/useUserProfile';
import useUpdateThumbnail from './hooks/useUpdateThumbnail';
import useUser from '../../lib/hooks/useUser';
import RequireLogin from '../../components/common/RequireLogin';
import { useCFUpload } from '../../lib/hooks/useCFUpload';

export type SettingUserProfileContainerProps = {};

function SettingUserProfileContainer(props: SettingUserProfileContainerProps) {
  const user = useUser();
  const { profile, update } = useUserProfile();
  const [upload] = useUpload();
  const { upload: cfUpload } = useCFUpload();
  const updateThumbnail = useUpdateThumbnail();
  const [imageBlobUrl, setImageBlobUrl] = React.useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const uploadThumbnail = async () => {
    const file = await upload();
    if (!file) return;
    setLoading(true);
    setImageBlobUrl(URL.createObjectURL(file));
    const image = await cfUpload(file, { type: 'profile' });
    setLoading(false);
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
      thumbnail={imageBlobUrl || profile.thumbnail}
      loading={loading}
    />
  );
}

export default SettingUserProfileContainer;
