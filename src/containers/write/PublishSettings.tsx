import React from 'react';
import PublishPrivacySettingContainer from './PublishPrivacySettingContainer';
import PublishURLSettingContainer from './PublishURLSettingContainer';
import PublishSeriesSectionContainer from './PublishSeriesSectionContainer';
import PublishActionButtonsContainer from './PublishActionButtonsContainer';
import PublishCaptchaContainer from './PublishCaptchaContainer';

export interface PublishSettingsProps {}

const PublishSettings: React.FC<PublishSettingsProps> = (props) => {
  return (
    <>
      <div>
        <PublishPrivacySettingContainer />
        <PublishURLSettingContainer />
        <PublishSeriesSectionContainer />
        <PublishCaptchaContainer />
      </div>
      <PublishActionButtonsContainer />
    </>
  );
};

export default PublishSettings;
