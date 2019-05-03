import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules';
import PublishScreenTemplate from '../../components/write/PublishScreenTemplate';
import PublishPreviewContainer from './PublishPreviewContainer';
import PublishPrivacySettingContainer from './PublishPrivacySettingContainer';
import PublishURLSettingContainer from './PublishURLSettingContainer';
import PublishSeriesSectionContainer from './PublishSeriesSectionContainer';
import PublishActionButtons from '../../components/write/PublishActionButtons';

interface OwnProps {}
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
type PublishScreenProps = OwnProps & StateProps & DispatchProps;

const mapStateToProps = (state: RootState) => ({});
const mapDispatchToProps = {};

const PublishScreen: React.FC<PublishScreenProps> = props => {
  return (
    <PublishScreenTemplate
      left={<PublishPreviewContainer />}
      right={
        <>
          <div>
            <PublishPrivacySettingContainer />
            <PublishURLSettingContainer />
            <PublishSeriesSectionContainer />
          </div>
          <PublishActionButtons />
        </>
      }
    />
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(PublishScreen);
