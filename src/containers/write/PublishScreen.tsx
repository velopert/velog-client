import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import PublishScreenTemplate from '../../components/write/PublishScreenTemplate';
import PublishPreviewContainer from './PublishPreviewContainer';
import PublishPrivacySettingContainer from './PublishPrivacySettingContainer';
import PublishURLSettingContainer from './PublishURLSettingContainer';
import PublishSeriesSectionContainer from './PublishSeriesSectionContainer';

import PublishActionButtonsContainer from './PublishActionButtonsContainer';
import PublishSettings from './PublishSettings';
import useBoolean from '../../lib/hooks/useBoolean';

interface OwnProps {}

const mapStateToProps = ({ write }: RootState) => ({
  visible: write.publish,
});
const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export type PublishScreenProps = OwnProps & StateProps & DispatchProps;

const PublishScreen: React.FC<PublishScreenProps> = ({ visible }) => {
  const [editSeries, onToggleEditSeries] = useBoolean(false);
  return (
    <PublishScreenTemplate
      visible={visible}
      left={<PublishPreviewContainer />}
      right={<PublishSettings />}
    />
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(PublishScreen);
