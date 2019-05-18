import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import PublishScreenTemplate from '../../components/write/PublishScreenTemplate';
import PublishPreviewContainer from './PublishPreviewContainer';
import PublishPrivacySettingContainer from './PublishPrivacySettingContainer';
import PublishURLSettingContainer from './PublishURLSettingContainer';
import PublishSeriesSectionContainer from './PublishSeriesSectionContainer';

import PublishActionButtonsContainer from './PublishActionButtonsContainer';

interface OwnProps {}

const mapStateToProps = ({ write }: RootState) => ({
  visible: write.publish,
});
const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export type PublishScreenProps = OwnProps & StateProps & DispatchProps;

const PublishScreen: React.FC<PublishScreenProps> = ({ visible }) => {
  return (
    <PublishScreenTemplate
      visible={visible}
      left={<PublishPreviewContainer />}
      right={
        <>
          <div>
            <PublishPrivacySettingContainer />
            <PublishURLSettingContainer />
            <PublishSeriesSectionContainer />
          </div>
          <PublishActionButtonsContainer />
        </>
      }
    />
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(PublishScreen);
