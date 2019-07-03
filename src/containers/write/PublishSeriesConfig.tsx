import React from 'react';
import PublishSection from '../../components/write/PublishSection';
import PublishSeriesCreate from '../../components/write/PublishSeriesCreate';

export interface PublishSeriesConfigProps {}

const PublishSeriesConfig: React.FC<PublishSeriesConfigProps> = props => {
  return (
    <PublishSection title="시리즈 설정">
      <PublishSeriesCreate onSubmit={() => {}} username="fakeusername" />
    </PublishSection>
  );
};

export default PublishSeriesConfig;
