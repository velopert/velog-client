import * as React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../modules';
import PublishScreenTemplate from '../../components/write/PublishScreenTemplate';
import PublishPreviewContainer from './PublishPreviewContainer';
import PublishSettings from './PublishSettings';
import PublishSeriesConfig from './PublishSeriesConfig';

export interface PublishScreenProps {}

const PublishScreen: React.FC<PublishScreenProps> = () => {
  const { visible, editSeries } = useSelector((state: RootState) => ({
    visible: state.write.publish,
    editSeries: state.write.editSeries,
  }));

  return (
    <PublishScreenTemplate
      visible={visible}
      left={<PublishPreviewContainer />}
      right={editSeries ? <PublishSeriesConfig /> : <PublishSettings />}
    />
  );
};

export default PublishScreen;
