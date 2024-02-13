import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import PublishCaptcha from './PublishCaptcha';

export interface PublishCaptchaContainerProps {}

const PublishCaptchaContainer: React.FC<PublishCaptchaContainerProps> = () => {
  const user = useSelector((state: RootState) => state.core.user);

  if (!user || user.is_trusted) return null;
  return <PublishCaptcha />;
};

export default PublishCaptchaContainer;
